import { useEffect, useRef } from 'react';

/**
 * A real position-based dynamics cloth solver — Verlet integration with
 * iterative distance constraints, the same family of method used in the
 * garment work at MSLab. Not a shader faking a drape: the vertices genuinely
 * simulate, which is why you can grab one and the rest responds.
 *
 * Runs on the CPU into a 2D canvas. A 34x24 grid is ~800 particles, which is
 * comfortably real-time and costs nothing to download.
 */

const COLS = 34;
const ROWS = 24;
const ITERATIONS = 4;
const GRAVITY = 900;
const DAMPING = 0.985;

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  pinned: boolean;
};

type Constraint = { a: number; b: number; rest: number };

/** Cloth reads dark-on-light or light-on-dark so it sits in either theme. */
const PALETTES = {
  dark: { r: 26, g: 58, b: 72, lr: 44, lg: 120, lb: 110, base: 0.22, gain: 0.55,
          seam: 'rgba(87, 210, 192, 0.26)', pin: '#57d2c0' },
  light: { r: 150, g: 176, b: 186, lr: -60, lg: -70, lb: -60, base: 0.30, gain: 0.55,
           seam: 'rgba(31, 92, 140, 0.30)', pin: '#1f5c8c' },
} as const;

export default function ClothExhibit({
  wind,
  theme = 'dark',
  onTear,
}: {
  wind: number;
  theme?: 'light' | 'dark';
  onTear?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windRef = useRef(wind);
  windRef.current = wind;
  // Held in a ref so switching theme repaints without restarting the solver —
  // the drape you already pulled into shape stays put.
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const onTearRef = useRef(onTear);
  onTearRef.current = onTear;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let spacing = 0;
    let originX = 0;
    let originY = 0;

    let particles: Particle[] = [];
    let constraints: Constraint[] = [];

    function build() {
      particles = [];
      constraints = [];

      spacing = Math.min(width / (COLS + 6), height / (ROWS + 8));
      originX = (width - spacing * (COLS - 1)) / 2;
      originY = spacing * 2.2;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = originX + col * spacing;
          const y = originY + row * spacing;
          particles.push({
            x,
            y,
            px: x,
            py: y,
            // Pinned along the top edge, every fourth point — like a garment
            // hanging from a rail.
            pinned: row === 0 && col % 4 === 0,
          });
        }
      }

      const index = (col: number, row: number) => row * COLS + col;
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (col < COLS - 1) {
            constraints.push({ a: index(col, row), b: index(col + 1, row), rest: spacing });
          }
          if (row < ROWS - 1) {
            constraints.push({ a: index(col, row), b: index(col, row + 1), rest: spacing });
          }
          // Shear constraints stop the sheet folding flat into a line.
          if (col < COLS - 1 && row < ROWS - 1) {
            constraints.push({
              a: index(col, row),
              b: index(col + 1, row + 1),
              rest: spacing * Math.SQRT2,
            });
          }
        }
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.max(1, Math.floor(width * dpr));
      canvas!.height = Math.max(1, Math.floor(height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // ── Interaction ────────────────────────────────────────────────────────
    const pointer = { x: 0, y: 0, down: false, grabbed: -1 };

    function toLocal(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    function onPointerDown(event: PointerEvent) {
      const { x, y } = toLocal(event);
      pointer.x = x;
      pointer.y = y;
      pointer.down = true;

      let nearest = -1;
      let nearestDist = spacing * 2.5;
      particles.forEach((p, i) => {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = i;
        }
      });
      pointer.grabbed = nearest;
      if (nearest >= 0) canvas!.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      const { x, y } = toLocal(event);
      pointer.x = x;
      pointer.y = y;
    }

    function onPointerUp() {
      pointer.down = false;
      pointer.grabbed = -1;
    }

    function onDoubleClick(event: MouseEvent) {
      // Tear: drop the constraints near the cursor.
      const rect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const before = constraints.length;
      constraints = constraints.filter((c) => {
        const a = particles[c.a];
        return Math.hypot(a.x - x, a.y - y) > spacing * 1.8;
      });
      if (constraints.length !== before) onTearRef.current?.();
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('dblclick', onDoubleClick);

    // ── Solver ─────────────────────────────────────────────────────────────
    let frame = 0;
    let last = performance.now();
    let time = 0;

    function step(dt: number) {
      time += dt;
      const windForce = windRef.current;

      for (const p of particles) {
        if (p.pinned) continue;
        const vx = (p.x - p.px) * DAMPING;
        const vy = (p.y - p.py) * DAMPING;
        p.px = p.x;
        p.py = p.y;

        // Gusting wind, stronger toward the free lower edge.
        const gust = Math.sin(time * 1.7 + p.y * 0.012) * 0.5 + 0.5;
        p.x += vx + windForce * gust * dt * 60;
        p.y += vy + GRAVITY * dt * dt;
      }

      if (pointer.down && pointer.grabbed >= 0) {
        const grabbed = particles[pointer.grabbed];
        grabbed.x = pointer.x;
        grabbed.y = pointer.y;
        grabbed.px = pointer.x;
        grabbed.py = pointer.y;
      }

      for (let iteration = 0; iteration < ITERATIONS; iteration++) {
        for (const c of constraints) {
          const a = particles[c.a];
          const b = particles[c.b];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const diff = (dist - c.rest) / dist;
          const offsetX = dx * 0.5 * diff;
          const offsetY = dy * 0.5 * diff;

          if (!a.pinned) {
            a.x += offsetX;
            a.y += offsetY;
          }
          if (!b.pinned) {
            b.x -= offsetX;
            b.y -= offsetY;
          }
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const palette = PALETTES[themeRef.current];

      // Shade each quad by its screen-space area — a cheap stand-in for a
      // normal, which reads convincingly as folds catching the light.
      const index = (col: number, row: number) => row * COLS + col;
      for (let row = 0; row < ROWS - 1; row++) {
        for (let col = 0; col < COLS - 1; col++) {
          const a = particles[index(col, row)];
          const b = particles[index(col + 1, row)];
          const c = particles[index(col + 1, row + 1)];
          const d = particles[index(col, row + 1)];

          const area = Math.abs((b.x - a.x) * (d.y - a.y) - (d.x - a.x) * (b.y - a.y));
          const lit = Math.min(1, area / (spacing * spacing));

          ctx!.fillStyle = `rgba(${Math.round(palette.r + lit * palette.lr)}, ${Math.round(
            palette.g + lit * palette.lg
          )}, ${Math.round(palette.b + lit * palette.lb)}, ${palette.base + lit * palette.gain})`;

          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.lineTo(c.x, c.y);
          ctx!.lineTo(d.x, d.y);
          ctx!.closePath();
          ctx!.fill();
        }
      }

      // Seam lines — the structure the solver is actually enforcing.
      ctx!.strokeStyle = palette.seam;
      ctx!.lineWidth = 0.7;
      ctx!.beginPath();
      for (const c of constraints) {
        const a = particles[c.a];
        const b = particles[c.b];
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
      }
      ctx!.stroke();

      // Pins along the rail.
      ctx!.fillStyle = palette.pin;
      for (const p of particles) {
        if (!p.pinned) continue;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop(now: number) {
      frame = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      step(dt);
      draw();
    }

    if (reduceMotion) {
      // Settle to a resting drape, then hold still.
      for (let i = 0; i < 240; i++) step(1 / 60);
      draw();
    } else {
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('dblclick', onDoubleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
      aria-label="Interactive cloth simulation. Drag to pull the fabric, double-click to tear it."
    />
  );
}
