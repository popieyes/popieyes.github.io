import type { Role } from './types';

/**
 * Real record only.
 *
 * The previous site shipped a second, invented version of this list in
 * ServiceRecord.jsx — "Super Ninja Studio", "Unknown Sector (NDA)", a 2018
 * start date, a fabricated 40% memory saving. That file is deleted. This is
 * the accurate history, ported from the old blocks/WorkHistory.jsx.
 *
 * Newest first.
 */
export const experience: Role[] = [
  {
    start: '2025-07',
    end: '-',
    period: 'Jul 2025 — Ongoing',
    title: 'Research Engineer',
    org: 'MSLab — Rey Juan Carlos University',
    location: 'Madrid, Spain',
    kind: 'work',
    current: true,
    notes:
      'Researching solutions for vectorizing 3D scenes to SVG, and building front-end and back-end tooling for cloth simulation.',
  },
  {
    start: '2024-09',
    end: '2025-05',
    period: 'Sep 2024 — May 2025',
    title: 'MSc Computer Graphics, Virtual Reality & Games',
    org: 'Rey Juan Carlos University',
    location: 'Madrid, Spain',
    kind: 'study',
    notes:
      'Rendering projects in Vulkan and OpenGL, implementing advanced effects with a big focus on offline and real-time rendering. Simulation projects involving fluids and deformable rigidbodies.',
  },
  {
    start: '2024-06',
    end: '2024-08',
    period: 'Jun 2024 — Aug 2024',
    title: 'Gameplay Programmer, Internship',
    org: 'Kumiho Esports S.L.',
    location: 'Spain',
    kind: 'work',
    notes:
      'Led the programming effort on a casual trivia game, delivering a fully functional demo that was presented at Gamescom 2024.',
  },
];
