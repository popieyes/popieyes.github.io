import { PASSES_SHADER, WATER_SHADER, PATHTRACER_SHADER } from './shaders';

/**
 * ─── HOW TO SHOW WORK THAT DOESN'T RUN IN A BROWSER ──────────────────────────
 *
 * A native Vulkan engine and a Unity game can't be reproduced as a fragment
 * shader, so the demo system takes four kinds of exhibit instead of one:
 *
 *   shader  A GLSL program running live. Zero assets.
 *   sim     A solver running live on canvas. Zero assets.
 *   video   A capture of the real thing running natively. This is the answer
 *           for Hernan Engine — record the engine, drop in a .webm, flip
 *           `enabled`. Not interactive, but it's genuinely your build.
 *   embed   An iframe. Unity exports to WebGL natively, so Subject Zero and
 *           Super Ninja can be *actually playable* here. Host the build on
 *           itch.io and point `src` at the embed URL.
 *
 * ─── PROVENANCE IS NOT DECORATION ────────────────────────────────────────────
 *
 * Every exhibit states what the viewer is looking at, because the difference
 * matters to the only people who will care:
 *
 *   live     Your code, running now.
 *   rebuilt  A browser reproduction of a technique from your work. NOT the
 *            original codebase. The toon water below is Unity/HLSL in reality;
 *            what runs here is a re-implementation.
 *   capture  Video of the real native build.
 *   playable The real build, compiled to WebGL.
 *
 * Anything marked `rebuilt` must say so on screen. Claiming a browser
 * reproduction is your engine is the same overclaiming we stripped out of the
 * old site.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Provenance = 'live' | 'rebuilt' | 'capture' | 'playable';

export const PROVENANCE_LABELS: Record<Provenance, string> = {
  live: 'Running live',
  rebuilt: 'Rebuilt for the browser',
  capture: 'Captured from the native build',
  playable: 'Playable — real build',
};

export type Control =
  | { kind: 'segmented'; id: string; label: string; options: string[] }
  | { kind: 'range'; id: string; label: string; min: number; max: number; step: number };

export type Demo = {
  id: string;
  title: string;
  sub: string;
  caption: string;
  provenance: Provenance;
  /** Links back to the write-up in the portfolio. */
  projectSlug?: string;
  /** Off means it never renders. Use it for exhibits whose asset isn't ready. */
  enabled: boolean;
  controls?: Control[];
} & (
  | { kind: 'shader'; fragment: string; accumulate?: boolean }
  | { kind: 'sim'; sim: 'cloth' }
  | { kind: 'video'; src: string; poster?: string }
  | { kind: 'embed'; src: string; ratio?: number }
);

export const DEMOS: Demo[] = [
  {
    id: 'passes',
    kind: 'shader',
    fragment: PASSES_SHADER,
    title: 'Render passes',
    sub: 'Raymarched SDF scene · WebGL 2',
    caption:
      'One scene, six buffers. This is what a deferred renderer keeps around before it decides what a pixel looks like. Switch channels to see each one.',
    provenance: 'live',
    projectSlug: 'hernan-engine',
    enabled: true,
    controls: [
      {
        kind: 'segmented',
        id: 'uMode',
        label: 'Buffer',
        options: ['Beauty', 'Albedo', 'Normal', 'Depth', 'AO', 'Cost'],
      },
    ],
  },

  {
    id: 'cloth',
    kind: 'sim',
    sim: 'cloth',
    title: 'Garment solver',
    sub: 'Position-based dynamics · 800 particles',
    caption:
      'A real solver: Verlet integration with iterative distance constraints, the same family of method behind the cloth work at MSLab. Drag to pull it. Double-click to tear it.',
    provenance: 'live',
    enabled: true,
    controls: [{ kind: 'range', id: 'wind', label: 'Wind', min: -1.2, max: 1.2, step: 0.05 }],
  },

  {
    id: 'pathtracer',
    kind: 'shader',
    fragment: PATHTRACER_SHADER,
    accumulate: true,
    title: 'Path tracer',
    sub: 'Progressive Monte Carlo · 1 spp per frame',
    caption:
      'One sample per pixel per frame, accumulating into a float buffer. The noise clearing as you watch is what unbiased integration actually looks like. The original is C++ on the Nori framework.',
    provenance: 'rebuilt',
    projectSlug: 'nori-path-tracer',
    enabled: true,
  },

  {
    id: 'water',
    kind: 'shader',
    fragment: WATER_SHADER,
    title: 'Toon water',
    sub: 'Banded shading · intersection foam',
    caption:
      'Quantised lighting and a foam line where the surface meets geometry. The original is HLSL in Unity; this is the same technique written as a fragment program.',
    provenance: 'rebuilt',
    projectSlug: 'water-toon-shader',
    enabled: true,
    controls: [
      { kind: 'range', id: 'uFoam', label: 'Foam', min: 0.02, max: 0.4, step: 0.01 },
      { kind: 'range', id: 'uBands', label: 'Bands', min: 2, max: 12, step: 1 },
    ],
  },

  /* ─── READY TO TURN ON ─────────────────────────────────────────────────────
     Both of these work today. They need an asset, not code.

     Hernan Engine: record the engine running (OBS, 20-40s loop, no audio),
     encode small, drop it in public/video/, set enabled: true.
       ffmpeg -i capture.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 -vf scale=1280:-2 \
         -an public/video/hernan-engine.webm
     This is how you show a native Vulkan renderer on the web. There is no
     honest way to run it live — Vulkan has no browser target, and while
     Emscripten could compile the OpenGL backend to WebGL 2, that's a project
     in itself rather than a portfolio task.
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: 'hernan-capture',
    kind: 'video',
    src: '/video/hernan-engine.webm',
    title: 'Hernan Engine',
    sub: 'C++ · Vulkan · captured at 1080p',
    caption:
      'The engine running natively — deferred lighting, the editor viewport, and the Vulkan backend in progress. Vulkan has no browser target, so this is the real build on video rather than a reproduction.',
    provenance: 'capture',
    projectSlug: 'hernan-engine',
    enabled: false,
  },

  /* Unity exports to WebGL natively, so these can be genuinely playable.
     Build in Unity (WebGL target), upload to itch.io, then paste the embed
     URL below — itch iframes work fine from GitHub Pages. */
  {
    id: 'ninja-playable',
    kind: 'embed',
    src: 'https://itch.io/embed-upload/0000000?color=333333',
    ratio: 16 / 9,
    title: 'Super Ninja Deathmatch',
    sub: 'Unity WebGL build',
    caption:
      'The actual game, compiled to WebGL and playable here. Local multiplayer works with several people on one keyboard.',
    provenance: 'playable',
    projectSlug: 'super-ninja-deathmatch',
    enabled: false,
  },
];

export const activeDemos = DEMOS.filter((demo) => demo.enabled);
