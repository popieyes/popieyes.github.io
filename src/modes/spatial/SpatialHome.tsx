import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import ShaderCanvas from './ShaderCanvas';
import ClothExhibit from './ClothExhibit';
import { PASSES_SHADER, WATER_SHADER, PATHTRACER_SHADER } from './shaders';
import ModeSwitch from '../../components/ModeSwitch';
import { useMode } from '../../ModeContext';
import { projects } from '../../content/projects';

type ExhibitId = 'passes' | 'water' | 'pathtracer' | 'cloth';

const EXHIBITS: {
  id: ExhibitId;
  label: string;
  sub: string;
  caption: string;
  slug?: string;
}[] = [
  {
    id: 'passes',
    label: 'Render passes',
    sub: 'Raymarched · SDF scene',
    caption:
      'One scene, six buffers. This is what a deferred renderer keeps around before it decides what a pixel looks like.',
    slug: 'hernan-engine',
  },
  {
    id: 'cloth',
    label: 'Garment solver',
    sub: 'Position-based dynamics',
    caption:
      'A real solver — Verlet integration with iterative distance constraints, the method behind the cloth work at MSLab. Drag it. Double-click to tear.',
  },
  {
    id: 'pathtracer',
    label: 'Path tracer',
    sub: 'Progressive · Monte Carlo',
    caption:
      'One sample per pixel per frame, accumulating. The noise clearing as you watch is what unbiased integration actually looks like.',
    slug: 'nori-path-tracer',
  },
  {
    id: 'water',
    label: 'Toon water',
    sub: 'Banded shading · foam',
    caption:
      'Quantised lighting and a foam line where the surface meets geometry — the Unity shader, rebuilt as a fragment program.',
    slug: 'water-toon-shader',
  },
];

const PASS_CHANNELS = ['Beauty', 'Albedo', 'Normal', 'Depth', 'AO', 'Cost'];

function useFps() {
  const [fps, setFps] = useState(0);
  const frames = useRef(0);
  const since = useRef(performance.now());

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      frames.current += 1;
      const now = performance.now();
      if (now - since.current >= 1000) {
        setFps(Math.round((frames.current * 1000) / (now - since.current)));
        frames.current = 0;
        since.current = now;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return fps;
}

export default function SpatialHome() {
  const { setMode } = useMode();
  const [active, setActive] = useState<ExhibitId>('passes');
  const [pass, setPass] = useState(0);
  const [wind, setWind] = useState(0.35);
  const [foam, setFoam] = useState(0.12);
  const [bands, setBands] = useState(4);
  const [samples, setSamples] = useState(0);
  const fps = useFps();

  const exhibit = EXHIBITS.find((item) => item.id === active)!;
  const project = exhibit.slug ? projects.find((p) => p.slug === exhibit.slug) : undefined;

  // Escape is the universal "let me out" — nobody should feel stuck in here.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMode('standard');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setMode]);

  useEffect(() => {
    setSamples(0);
  }, [active]);

  const panelStyle = {
    borderColor: 'var(--color-spatial-line)',
    background: 'rgba(9,12,16,.86)',
  } as const;

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#090c10' }}>
      {/* ── Stage ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {active === 'passes' && (
          <ShaderCanvas fragment={PASSES_SHADER} uniforms={{ uMode: pass }} className="h-full w-full" />
        )}
        {active === 'water' && (
          <ShaderCanvas
            fragment={WATER_SHADER}
            uniforms={{ uFoam: foam, uBands: bands }}
            className="h-full w-full"
          />
        )}
        {active === 'pathtracer' && (
          <ShaderCanvas
            fragment={PATHTRACER_SHADER}
            accumulate
            resetKey="nori"
            onSamples={setSamples}
            className="h-full w-full"
          />
        )}
        {active === 'cloth' && <ClothExhibit wind={wind} />}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 32%, rgba(0,0,0,.68) 100%)',
        }}
      />

      {/* ── HUD ──────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="pointer-events-auto flex flex-col gap-1">
            <h1
              className="type-label text-sm font-bold"
              style={{ color: 'var(--color-spatial-acc)' }}
            >
              {exhibit.label}
            </h1>
            <p className="type-label" style={{ color: '#6c7a87' }}>
              {exhibit.sub}
            </p>
          </div>

          <div className="pointer-events-auto flex items-start gap-3">
            <div
              className="hidden flex-col items-end gap-0.5 border px-3 py-2 tabular-nums sm:flex"
              style={panelStyle}
            >
              <span className="type-label" style={{ color: '#c6d2dc' }}>
                {fps} fps
              </span>
              {active === 'pathtracer' && (
                <span className="type-label" style={{ color: '#6c7a87' }}>
                  {samples} spp
                </span>
              )}
              <span className="type-label" style={{ color: '#6c7a87' }}>
                0 MB geometry
              </span>
            </div>
            <ModeSwitch compact />
          </div>
        </div>

        {/* Caption + per-exhibit controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p
              className="pointer-events-auto max-w-md text-sm leading-relaxed"
              style={{ color: '#9fadb8' }}
            >
              {exhibit.caption}
            </p>

            <div className="pointer-events-auto flex flex-wrap items-center gap-3">
              {active === 'passes' && (
                <div className="flex flex-wrap border" style={panelStyle} role="group" aria-label="Render pass">
                  {PASS_CHANNELS.map((channel, index) => (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => setPass(index)}
                      aria-pressed={pass === index}
                      className="type-label px-3 py-2 transition-colors cursor-pointer"
                      style={{
                        background: pass === index ? 'var(--color-spatial-acc)' : 'transparent',
                        color: pass === index ? '#090c10' : '#8b98a4',
                        fontWeight: pass === index ? 700 : 400,
                      }}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              )}

              {active === 'cloth' && (
                <label className="flex items-center gap-3 border px-4 py-2.5" style={panelStyle}>
                  <span className="type-label" style={{ color: '#8b98a4' }}>
                    Wind
                  </span>
                  <input
                    type="range"
                    min={-1.2}
                    max={1.2}
                    step={0.05}
                    value={wind}
                    onChange={(event) => setWind(Number(event.target.value))}
                    className="w-32 accent-[#57d2c0]"
                  />
                </label>
              )}

              {active === 'water' && (
                <>
                  <label className="flex items-center gap-3 border px-4 py-2.5" style={panelStyle}>
                    <span className="type-label" style={{ color: '#8b98a4' }}>
                      Foam
                    </span>
                    <input
                      type="range"
                      min={0.02}
                      max={0.4}
                      step={0.01}
                      value={foam}
                      onChange={(event) => setFoam(Number(event.target.value))}
                      className="w-24 accent-[#57d2c0]"
                    />
                  </label>
                  <label className="flex items-center gap-3 border px-4 py-2.5" style={panelStyle}>
                    <span className="type-label" style={{ color: '#8b98a4' }}>
                      Bands
                    </span>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      step={1}
                      value={bands}
                      onChange={(event) => setBands(Number(event.target.value))}
                      className="w-24 accent-[#57d2c0]"
                    />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Dock */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div
              className="pointer-events-auto flex flex-wrap gap-2"
              role="tablist"
              aria-label="Exhibits"
            >
              {EXHIBITS.map((item) => {
                const isActive = item.id === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(item.id)}
                    className="type-label border px-4 py-2.5 transition-colors cursor-pointer"
                    style={{
                      borderColor: isActive ? 'var(--color-spatial-acc)' : 'var(--color-spatial-line)',
                      background: 'rgba(9,12,16,.86)',
                      color: isActive ? 'var(--color-spatial-acc)' : '#8b98a4',
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pointer-events-auto flex flex-wrap items-center gap-2">
              {project && (
                <Link
                  to={`/projects/${project.slug}`}
                  className="type-label border px-4 py-2.5 transition-opacity hover:opacity-75"
                  style={{ ...panelStyle, color: '#c6d2dc' }}
                >
                  Read about {project.title} →
                </Link>
              )}
              <button
                type="button"
                onClick={() => setMode('standard')}
                className="type-label border px-4 py-2.5 transition-opacity hover:opacity-75 cursor-pointer"
                style={{ ...panelStyle, color: '#8b98a4' }}
              >
                Esc — exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
