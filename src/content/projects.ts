import type { Project } from './types';

/**
 * ─── ADDING A PROJECT ────────────────────────────────────────────────────────
 * Append one object. It appears in all three modes automatically, gets a
 * permalink at /projects/<slug>, and shows up in the Spatial dock if you give
 * it an `exhibit` id. Nothing else to edit.
 *
 * ─── DATES ───────────────────────────────────────────────────────────────────
 * The old data used "01.01.1990" and "Unknown" as filler on three projects.
 * `year` is optional here instead: where the real date isn't recorded it is
 * simply omitted and the UI renders nothing. Fill these in when you know them —
 * search for "no year" below.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const projects: Project[] = [
  {
    slug: 'hernan-engine',
    title: 'Hernan Engine',
    kind: 'Game engine',
    year: '2025 — ongoing',
    role: 'Engine programmer',
    stack: ['C++', 'OpenGL', 'Vulkan', 'GLSL', 'Slang'],
    featured: true,
    exhibit: 'passes',
    summary:
      'An engine built from scratch, with the renderer deliberately decoupled from the editor so the backend can be swapped.',
    overview:
      'At university I worked on several OpenGL projects, but I never came away feeling I had a real grasp of the theory or the API — only of the specific assignment in front of me. So I started one from scratch.\n\nBuilding it from the ground up was the right call. I finally understood the reason behind every line and the shape of the code, and more to the point it was mine to explore and break. It stays an open project: I keep iterating on it, making things with it, and improving the engine so the next thing I make with it can be better.',
    technical:
      'The architecture is deliberately decoupled, separating the engine proper from the editor so that the rendering backend can be swapped without disturbing anything above it.\n\nThe CMake configuration is split into separate libraries — Core, OpenGL, Vulkan — each holding its own files and packages. The Vulkan backend is in progress, built to slot in behind the same interface the OpenGL one implements, which is the whole point of the split.',
    links: [{ label: 'Source', href: 'https://github.com/popieyes/GL_Engine' }],
    media: [
      { src: '/images/gl/gl-5.webp', alt: 'Hernan Engine rendering a lit scene' },
      { src: '/images/opengl.webp', alt: 'Engine editor viewport' },
      { src: '/images/gl/gl-3.webp', alt: 'Engine scene with material test geometry' },
      { src: '/images/gl/gl-4.webp', alt: 'Engine lighting pass output' },
    ],
    dossier: { caseId: 'TECH-A', stamp: 'ACTIVE' },
  },

  {
    slug: 'nori-path-tracer',
    title: 'Nori Path Tracer',
    kind: 'Physically based rendering',
    year: '2025',
    role: 'Programmer',
    stack: ['C++', 'Nori'],
    featured: true,
    exhibit: 'pathtracer',
    summary:
      'A path tracer written from the ground up — PDFs, importance sampling, and material response.',
    overview:
      'I built the path tracing side of the Nori framework from scratch: the probability density functions, the ray interactions with materials, and the integrator that ties them together.\n\nThe result renders realistic scenes across a range of simulated materials, and holds up on the cases that usually expose a sloppy implementation — reflective and metallic surfaces, where an incorrect PDF shows up immediately as either fireflies or a scene that is quietly too dark.',
    media: [{ src: '/images/projects-nori.webp', alt: 'Path traced spheres showing metallic and diffuse materials' }],
    dossier: { caseId: 'TECH-C', stamp: 'CONTAINED' },
  },

  {
    slug: 'water-toon-shader',
    title: 'Water Toon Shader',
    kind: 'Shading',
    // no year — real date not recorded
    role: 'Shader programmer',
    stack: ['Unity', 'HLSL'],
    featured: true,
    exhibit: 'water',
    summary:
      'Tessellation and vertex displacement producing foam, wave motion and buoyancy on a stylised surface.',
    overview:
      'A stylised water shader built by following a tutorial from Roystan, then taken past where the tutorial stops. I implemented every feature through to a finished look — the foam line where geometry intersects the surface, the wave displacement, and objects that float and bob correctly on top of it.\n\nCredit where it is due: the approach is Roystan\'s. The value for me was in the parts after the walkthrough ended, getting the scene to hold together as something presentable.',
    media: [{ src: '/images/projects-water.webp', alt: 'Stylised toon water with foam lines and floating objects' }],
    dossier: { caseId: 'TECH-B', stamp: 'CLASSIFIED' },
  },

  {
    slug: 'subject-zero',
    title: 'Subject Zero',
    kind: '2D survival horror',
    // no year — real date not recorded
    role: 'Programmer',
    stack: ['Unity', 'C#'],
    summary:
      'A roguelike survival horror set in an abandoned lab, where the thing hunting you is always already awake.',
    overview:
      'You are an adventurer exploring the depths of an abandoned lab where mutant creatures have escaped and now roam each floor. In the darkest room, Subject Zero has woken and is on an unstoppable path toward you.\n\nThe choice the game puts to you is whether to take it on directly or keep navigating the lab — gathering equipment and levelling up until you are strong enough to win the fight on your terms. Everything else is built around making that decision feel live at all times.',
    media: [
      { src: '/images/projects-szero.webp', alt: 'Subject Zero gameplay' },
      { src: '/images/szero/zero2-mainmenu.webp', alt: 'Main menu' },
      { src: '/images/szero/zero2-options.webp', alt: 'Options screen' },
      { src: '/images/szero/zero2-skills.webp', alt: 'Skill tree' },
      { src: '/images/szero/zero2-game.webp', alt: 'Combat against mutants' },
      { src: '/images/szero/zero2-game2.webp', alt: 'Lab corridor' },
      { src: '/images/szero/zero2-game3.webp', alt: 'Boss encounter' },
    ],
    dossier: { caseId: 'AWE-01', stamp: 'CONTAINED' },
  },

  {
    slug: 'super-ninja-deathmatch',
    title: 'Super Ninja Deathmatch',
    kind: 'Multiplayer party game',
    // no year — real date not recorded
    role: 'Gameplay programmer',
    stack: ['Unity', 'C#', 'Netcode for GameObjects'],
    summary:
      'A four-player party game with local and online multiplayer over Unity services.',
    overview:
      'A small, fast casual party game for up to four players, supporting both local play and online multiplayer through Unity services.\n\nYou play a ninja in a frantic brawl — throwing shuriken, dashing through enemies to kill them, and clashing in sword fights against bots or your friends. Most of my work went into the netcode and into keeping the gameplay readable when four players are all moving at once.',
    media: [
      { src: '/images/projects-ninja.webp', alt: 'Super Ninja Deathmatch gameplay' },
      { src: '/images/ninja/ninja-home.webp', alt: 'Title screen' },
      { src: '/images/ninja/ninja-select.webp', alt: 'Character select' },
      { src: '/images/ninja/ninja-tut.webp', alt: 'Tutorial screen' },
      { src: '/images/ninja/ninja-tut-2.webp', alt: 'Tutorial, movement' },
      { src: '/images/ninja/ninja-itch-1.webp', alt: 'Promotional art' },
      { src: '/images/ninja/ninja-itch-2.webp', alt: 'Promotional art' },
    ],
    dossier: { caseId: 'INC-44', stamp: 'ONGOING' },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
