# popieyes.github.io

Portfolio of Santiago Meneses Gómez — graphics programmer and research engineer.

One content layer, several ways to read it.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # → build/
npm run deploy     # build + push to gh-pages
```

---

## Before this goes live

The only things on the site that aren't real. Grep for `TODO`.

- [x] ~~`EMAIL` and `LINKEDIN`~~ — done
- [ ] `public/cv/santiago-meneses-cv.pdf` — add the PDF, or set `profile.cv` to `undefined` and the button disappears
- [ ] Three projects have no `year` (see [Adding a project](#adding-a-project))

---

## Adding a project

Append one object to `src/content/projects.ts`. That's the whole job — it appears
in every mode and gets a permalink at `/projects/<slug>`.

```ts
{
  slug: 'my-project',          // becomes /projects/my-project
  title: 'My Project',
  kind: 'Renderer',
  year: '2026',                // omit entirely if you don't know it
  role: 'Programmer',
  stack: ['C++', 'Vulkan'],
  summary: 'One line for the card.',
  overview: 'Full prose.\n\nBlank lines separate paragraphs.',
  technical: 'Optional deeper write-up.',
  links: [{ label: 'Source', href: 'https://github.com/...' }],
  media: [{ src: '/images/shot.webp', alt: 'Describe it' }],
  mediaLayout: 'carousel',     // 'carousel' | 'aside' | 'grid'
  featured: true,
  dossier: { caseId: 'TECH-D', stamp: 'ACTIVE' },
}
```

Two rules that keep this from rotting:

1. **No markup in data.** Every string is plain text. Renderers apply emphasis.
   The old codebase put `<Redaction>` tags inside data strings and rendered them
   with `dangerouslySetInnerHTML`, which meant several project descriptions
   displayed as broken tags.
2. **Never invent a value to fill a field.** `year` is optional precisely so an
   unknown date renders as nothing rather than as `01.01.1990`.

`mediaLayout` picks how the images sit on the project page:

| Value | Best when |
|---|---|
| `carousel` (default) | Many shots, or variations on one view. One at a time with thumbnails. |
| `aside` | Each shot illustrates a different point — images run in a column beside the text. |
| `grid` | A few images that deserve to be seen at size, below the write-up. |

Images always size to their own aspect ratio: no letterboxing, no cropping.

Drop images in `public/images/`. Convert to webp first:

```sh
magick shot.png -resize '1600x1600>' -quality 82 shot.webp
```

---

## The three modes

| Mode | In the switch | What it's for |
|---|---|---|
| **Portfolio** | yes, default | Recruiters and research groups. Fastest path to the work. |
| **Demos** | yes | Things running live in the browser. Lazy-loaded. |
| **Dossier** | **hidden** | The investigation-board theme. Built, but not finished. |

Dossier is reachable at `?mode=dossier` but stays out of the switch until it's
ready — add it to `VISIBLE_MODES` in `src/ModeContext.tsx` to ship it.

The mode lives in `localStorage` and in a `?mode=` query param, so a shared link
carries the sender's choice. Portfolio and Demos share one light/dark theme —
the shaders take a `uLight` uniform so their skies match the page. Dossier
commits to its own world.

### Portfolio — "pattern paper"

The divider system is a **seam allowance**: dashed rules and pattern notches, the
way a sewing pattern marks where two pieces join. It's a structural device drawn
from the garment research, not decoration. The notch (`.notch`) means *current* —
it flags the active item and is never used ornamentally.

Motion follows the same idea: the seam stitches itself in left-to-right, then the
panel it holds rises in behind it. That is the only motion concept on the page.

### Dossier

Manila paper, pushpins, stamps, typewriter type, and blurred paper drifting in the
margins. Two rules keep it honest:

- **Redaction is decorative only.** It never covers a skill, date, role, or
  anything a reader needs, and it carries an `aria-label` with the real text. The
  previous version blacked out its own competencies list.
- **No invented credentials.** No fabricated agencies, clearance levels, or case
  numbers attached to real employment history.

### Demos

Edit `src/modes/demos/registry.ts`. Four kinds of exhibit, because a native
Vulkan engine and a Unity game can't be reproduced as a fragment shader:

| Kind | Use it for |
|---|---|
| `shader` | GLSL running live. Zero assets. |
| `sim` | A solver running live on canvas. Zero assets. |
| `video` | A capture of the real native build. **This is the answer for Hernan Engine.** |
| `embed` | An iframe. Unity exports to WebGL, so the games can be genuinely playable. |

**Every exhibit declares its provenance**, and it shows on screen:

| Provenance | Means |
|---|---|
| `live` | Your code, running now. |
| `rebuilt` | A browser reproduction of a technique. **Not** the original codebase. |
| `capture` | Video of the real native build. |
| `playable` | The real build, compiled to WebGL. |

The toon water and path tracer are marked `rebuilt` — the originals are HLSL in
Unity and C++ on Nori. Claiming a browser reproduction is your engine would be
the same overclaiming that was stripped out of the old site.

#### Turning on the two that are wired but off

Both need an asset, not code. Set `enabled: true` once the file exists.

**Hernan Engine** — record it, encode small, drop it in `public/video/`:

```sh
ffmpeg -i capture.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 -vf scale=1280:-2   -an public/video/hernan-engine.webm
```

Vulkan has no browser target, so video is the honest option. Emscripten could
compile the OpenGL backend to WebGL 2 — your swappable-backend architecture is
exactly what would make that possible — but that's a project, not a portfolio task.

**The Unity games** — build for WebGL, upload to itch.io, paste the embed URL
into `src`. Then they're actually playable here.

---

## Contact

Both modes show the email address and nothing else — no form. `ContactForm.tsx`
is still in the tree, unused, if you ever want it back; it posts to
`VITE_CONTACT_ENDPOINT` (Formspree or Web3Forms) and degrades to a mailto prompt
when that isn't set.

---

## Deployment

This is a **user site**, served from the repo root at `https://popieyes.github.io`.

`npm run build` emits `build/404.html` as a copy of `index.html`. GitHub Pages
serves 404.html for any path it has no file for, so a direct load of
`/projects/hernan-engine` boots the app and the router reads the path — clean URLs,
no redirect hop, no hash.

---

## Layout

```
src/
  content/          Single source of truth. Plain data, no JSX.
    types.ts        The contract, with the rules that keep it honest
    profile.ts      Identity, links, research statement
    experience.ts   Real work history only
    projects.ts     Every project
  components/       Shared across modes (ContactForm, Gallery, Reveal, ModeSwitch)
  modes/
    portfolio/      Default. Pattern-paper design system
    demos/          WebGL exhibits + registry.ts. Lazy-loaded behind React.lazy
    dossier/        The theme. Hidden from the switch until it's finished
  ModeContext.tsx   Which mode, persisted. VISIBLE_MODES gates the switch
  ThemeContext.tsx  Light/dark, shared by Portfolio and Demos
  index.css         Design tokens, the seam system, motion
```

Everything reads from `content/`. A mode is a renderer, never a content store.
