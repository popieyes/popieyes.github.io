import type { Project } from './types';

/**
 * ─── ADDING A PROJECT ────────────────────────────────────────────────────────
 * Append one object. It appears in all three modes automatically, gets a
 * permalink at /projects/<slug>, and shows up in Demos if you give
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
    mediaLayout: 'aside',
    dossier: { caseId: 'TECH-A', stamp: 'ACTIVE' },
  },

  {
    slug: 'nori-path-tracer',
    title: 'Nori Path Tracer',
    kind: 'Physically based rendering',
    role: 'Graphics Programmer',
    stack: ['C++', 'Nori', 'CMake'],
    featured: true,
    exhibit: 'pathtracer',
    summary:
      'Implementation of a path tracer. Area lights, light integrators, Multiple Importance Sampling, Next Event Estimation.',
    overview: `Nori is a minimalistic path tracer built for educational purposes in C++, a foundation for the Advanced Computer Graphics course at EPFL. \n\n 
    Nori base code provides features to make the work of building your own path tracer easier. Some of them are: a GUI with a render viewport, XML-based scene file loader, ray-triangle intersection, 
    basic point/vector/normal/ray/bounding box classes and more utilities, leaving the actual heavywork for you. \n\n
    The initial output you get with Nori is a black image, so it was up to me to render that into something a bit more 'beauty'-ful, implementing the integrators and the interactions of the light with different materials.\n\n 
    This little adventure of building a path tracer taught me a lot about light interactions and the little gimmicks done behind the curtains to obtain the maximum quality possible. In the images shown, you can see several examples of the classic Cornell Box using and combining two materials 
    --diffuse and mirror-- for each object present.
    `,
    technical: `Nori is built to be just the bare bone for the path tracer, so one of the first things I got to work on was establishing some base classes to be able to 
    obtain an actual image. I created an Emitter class, establishing an interface that all emitter objects should follow, followed by an Area Emitter
    implementing this newly created class. 
    
    \n\nNow I had a base line from where to start building the light in the scene but I still needed to implement the way the light was going to travel and interact. \n\n
    
    It was time to create an integrator, for a first render of the scene I went for a direct integrator, no bounces, just the plain first color the ray finds. After checking it was working correctly, next step was implementing more bounces so we could catch into our render the indirect lighting, 
    throwing into the mix Multiple Importance Sampling (MIS) and Next Event Estimation (NEE) to reduce the noise in the scene and improve quality.\n\n
    
    This project was fun and taught me a lot about statistics which is one of the topics in mathematics that I always struggle with. Honestly, MIS and NEE were the most complicated features for me to build, merely due to the difficulty that I have with probabilities and understanding
    how, for example, the PDFs affect the brightness of my scene. Even though it was hard I managed to get some good results and a fairly good implementation while improving my knowledge on the topics.`,
    media: [
      { src: '/images/nori/nori-1.webp', alt: 'Cornell box with two diffuse spheres lit by a ceiling area light' },
      { src: '/images/nori/nori-2.webp', alt: 'Cornell box with two mirror spheres reflecting the coloured walls' },
      { src: '/images/nori/nori-3.webp', alt: 'Cornell box with diffuse spheres reflected on a mirror room' },
      { src: '/images/nori/nori-4.webp', alt: 'Cornell box with diffuse spheres and mirrors on the left and right walls' },
    ],
    mediaLayout: 'aside',
    dossier: { caseId: 'TECH-C', stamp: 'CONTAINED' },
  },

  {
    slug: 'water-toon-shader',
    title: 'Water Toon Shader',
    kind: 'Shading',
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
    mediaLayout: 'grid',
    dossier: { caseId: 'AWE-01', stamp: 'CONTAINED' },
  },

  {
    slug: 'super-ninja-deathmatch',
    title: 'Super Ninja Deathmatch',
    kind: 'Multiplayer party game',
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
    mediaLayout: 'grid',
    dossier: { caseId: 'INC-44', stamp: 'ONGOING' },
  },

  {
    slug: 'nexus-legends',
    title: 'Nexus Legends',
    kind: 'Casual trivia game',
    role: 'Project Manager, Programmer, Game Designer, Video Editor',
    stack: ['Unity', 'C#', 'Adobe Premiere Pro'],
    summary: 'Trivia game based on League of Legends universe for use in schools',
    overview: 'Inspired in League Of Legends universe, Nexus Legends is a virtual board game in which two players take turns to destroy each others structures by answering trivia questions. Summoners! Choose your champion and harness their powers to get ahold of victory!',
    media: [
      { src: '/images/nexus/ef7a5bb2-7755-4b5e-8cc3-fafd29e49f47_rw_1200.webp', alt: 'Nexus Legends key art' },
      { src: '/images/nexus/21433e4d-fac6-4123-aab3-4ebe5156cba8_rw_600.webp', alt: 'The game board with lanes and towers' },
      { src: '/images/nexus/10924f1a-a10c-4eed-9648-d05e51cf9b42_rw_600.webp', alt: 'Overhead view of the board with the nexus at the top' },
      { src: '/images/nexus/0ff15554-e7cc-4afd-bb74-078b51761acb_rw_600.webp', alt: 'Board view with a champion card raised above the nexus' },
      { src: '/images/nexus/2d1a364a-8c06-4734-aaf9-f7f1445322bf_rw_600.webp', alt: 'Board state with a champion reveal card in play' },
      { src: '/images/nexus/30679ddf-f42b-470f-ae91-04492b5d8d9d_rw_600.webp', alt: 'In-game event banner reading "Sneaky Crab Appeared"' },
      { src: '/images/nexus/595fb078-6965-4a76-b1d6-de61067f367c_rw_600.webp', alt: 'Tower targeting on the board' },
      { src: '/images/nexus/3a4b4a4b-c086-4990-a230-e5ad115da65a_rw_600.webp', alt: 'Match view on a handheld display, score 0 vs 0' },
      { src: '/images/nexus/fe9ec452-e5da-4334-b877-a74b0d7b2665_rw_600.webp', alt: 'Trivia question prompt with multiple choice answers' },
      { src: '/images/nexus/59cc946f-c2df-41ce-85a6-e4313d6b24bc_rw_600.webp', alt: '"Gain Vision" positive card effect' },
      { src: '/images/nexus/9e7490ee-cf01-4c87-8457-19550d636e7b_rw_600.webp', alt: 'Match in progress on the board with score 0 vs 1' },
      { src: '/images/nexus/ddfcc545-1b6a-4bbf-b5dc-cd6b4c4efbba_rw_600.webp', alt: 'Close-up of a champion ability card being selected' },
      { src: '/images/nexus/13b8dc25-05be-4c92-9a00-ff579fa9540e_rw_600.webp', alt: 'Nexus Legends demo station at the Madrid Games Week booth' },
      { src: '/images/nexus/09917fef-a3af-43c8-b302-b6d586388981_rw_600.webp', alt: 'Nexus Legends demo station at the Madrid Games Week booth' },
      { src: '/images/nexus/08c008f9-52dc-4166-9ec9-93b9cada1ef8_rw_600.webp', alt: 'Nexus Legends box art and main menu on display at the booth' },
      { src: '/images/nexus/d5f1a5c7-71d9-4589-aab2-9c031263a988_rw_600.webp', alt: 'The Spain pavilion at the games expo' },
      { src: '/images/nexus/03002bf3-35a4-465a-b695-0ab271ed5d2b_rw_600.webp', alt: 'Coin-flip die roll screen to decide the first player' },
    ],
    mediaLayout: 'grid',
    dossier: { caseId: 'NXL-01', stamp: 'CONTAINED'}
  },
  {
    slug: 'timeloop',
    title: 'Timeloop',
    kind: 'Gamejam entry',
    role: 'Gameplay programmer, 2D Artist',
    stack: ['Unity', 'C#', 'Adobe Photoshop'],
    summary: 'A card based roguelite game. Select your characters, defeat your enemies in random encounters until you reach the final boss.',
    overview: `Strategy game in which you will need to be smart about each decision you take. Which duo of characters are you going to take until the end to defeat the big final threat to save your world?   `,
    media: [
      { src: '/images/timeloop/2954c3dc-3cb4-4a87-85d4-d58e7ba33f0e_rw_1920.webp', alt: 'Timeloop main menu with a desert and an hourglass' },
      { src: '/images/timeloop/002a6e51-00aa-4bcf-b052-74c905a019ea_rw_600.webp', alt: 'Class selection screen showing the Assassin' },
      { src: '/images/timeloop/eee92d0a-a3ed-4544-aa42-50ca6124e970_rw_600.webp', alt: 'Team confirmation screen with Golem and Necromancer stats' },
      { src: '/images/timeloop/657e95b3-4530-4f4e-853e-37db502e145a_rw_600.webp', alt: 'Path selection screen with branching encounters' },
      { src: '/images/timeloop/c07eea0c-1539-4100-b5f7-d60a8837772e_rw_1200.webp', alt: 'Turn-based battle in front of a castle' },
      { src: '/images/timeloop/67fab7ee-0b64-43bf-af19-68e8eee84ed5_rw_1200.webp', alt: 'Options menu for video and sound settings' },
    ],
    mediaLayout: 'grid',
    dossier: { caseId: 'NXL-01', stamp: 'CONTAINED'},

  },
  {
    slug: 'doing-time',
    title: 'Doing Time',
    kind: 'Gamejam entry',
    role: 'Gameplay programmer',
    stack: ['Unity', 'C#', 'Adobe Premiere Pro'],
    summary: 'A short heist experience in a bank, try to succesfully get to the vault and escape while evading guards and solving the puzzles.',
    overview: `Get yourself involved in a meticulously planned heist with a team of 3 professionals, do not get caught, solve the minipuzzles to get to the vault and get away with the money. \n\n It is that simple!`,
    media: [
      { src: '/images/doing-time/IcafuA.webp', alt: 'Cover art' },
      { src: '/images/doing-time/4W3JtZ.webp', alt: 'Doing Time Gameplay' },
      { src: '/images/doing-time/broy3g.webp', alt: 'Initial dialogue scene' },
      { src: '/images/doing-time/JT5Ucq.webp', alt: 'Main Menu' },
      { src: '/images/doing-time/mOxO8c.webp', alt: 'Character disguised as a guard' },
      { src: '/images/doing-time/XI12ZW.webp', alt: 'Doing Time Gameplay' },
      { src: '/images/doing-time/YZDamF.webp', alt: 'Doing Time Gameplay' },
    ],
    mediaLayout: 'grid',
    dossier: { caseId: 'NXL-01', stamp: 'CONTAINED'},
   
  }
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
