import type { Profile } from './types';

/**
 * ─── FILL THESE IN ───────────────────────────────────────────────────────────
 * Placeholders are marked TODO and are the only things on the site that aren't
 * real. Search this file for "TODO" before deploying.
 *   • email   — which address you want public
 *   • LinkedIn URL
 *   • cv      — drop the PDF at public/cv/santiago-meneses-cv.pdf
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const EMAIL = 'TODO@example.com'; // TODO: your public contact address
const LINKEDIN = 'https://www.linkedin.com/in/TODO'; // TODO

export const profile: Profile = {
  name: 'Santiago Meneses Gómez',
  shortName: 'Santiago',
  role: 'Graphics Programmer · Research Engineer',
  affiliation: 'MSLab — Rey Juan Carlos University',
  location: 'Madrid, Spain',

  intro:
    'I build renderers and the tooling around them. Right now I work as an Assistant Research Engineer at MSLab, Rey Juan Carlos University, on garment simulation and 3D scene vectorization. Outside the lab I write engines from scratch, because borrowing one never taught me what I wanted to know.',

  research:
    'My work at MSLab centres on a full pipeline for garment patterns: generating the 2D pattern pieces, assembling them into a wearable topology, and simulating the resulting cloth. The front end is a custom React and Three.js engine, with the simulation and tooling behind it — and a good share of the engineering goes into making those two halves agree about geometry.\n\nA second thread covers vectorization of 3D scenes to SVG: turning rendered geometry into resolution-independent output, which underneath is a visibility problem with a lot more depth than it first appears to have.\n\nBoth threads share a bias I keep coming back to. I care about the part of graphics where correctness and performance stop being separable concerns — where the fast path and the right answer have to be designed together rather than traded off.',

  links: [
    { label: 'GitHub', href: 'https://github.com/popieyes' },
    { label: 'LinkedIn', href: LINKEDIN },
  ],

  email: EMAIL,
  cv: '/cv/santiago-meneses-cv.pdf', // TODO: add this PDF, or set to undefined

  skills: [
    { label: 'Languages', items: ['C++', 'C#', 'Python', 'TypeScript'] },
    { label: 'Graphics', items: ['Vulkan', 'OpenGL', 'GLSL', 'HLSL', 'Slang'] },
    { label: 'Engines', items: ['Unity', 'Three.js', 'Custom C++ engines'] },
    { label: 'Focus', items: ['Real-time rendering', 'Cloth simulation', 'Engine architecture', 'Tooling'] },
  ],

  interests: [
    'Game jams',
    'Photography',
    'Drawing',
    'Songwriting',
    'Gym',
    'Travelling',
  ],
};
