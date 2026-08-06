# popieyes.github.io

Portfolio of Santiago Meneses Gómez — graphics programmer and research engineer.

One content layer, three ways to read it.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # → build/
npm run deploy     # build + push to gh-pages
```

---

## Before this goes live

Three placeholders are the only things on the site that aren't real. Grep for `TODO`.

- [ ] `src/content/profile.ts` — `EMAIL`, the public contact address
- [ ] `src/content/profile.ts` — `LINKEDIN` URL
- [ ] `public/cv/santiago-meneses-cv.pdf` — add the PDF, or set `profile.cv` to `undefined` and the button disappears
- [ ] `.env` — `VITE_CONTACT_ENDPOINT` (see [Contact form](#contact-form))
- [ ] Three projects have no `year` (see [Adding a project](#adding-a-project))

---

## Adding a project

Append one object to `src/content/projects.ts`. That's the whole job — it appears
in all three modes, gets a permalink at `/projects/<slug>`, and joins the Spatial
dock if you give it an `exhibit` id.

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

Drop images in `public/images/`. Convert to webp first:

```sh
magick shot.png -resize '1600x1600>' -quality 82 shot.webp
```

---

## The three modes

| Mode | Default | What it's for |
|---|---|---|
| **Standard** | yes | Recruiters and research groups. Fastest path to the work. |
| **Dossier** | | The investigation-board theme. Same content, in costume. |
| **Spatial** | | Live WebGL exhibits. Lazy-loaded, desktop, opt-in. |

The mode lives in `localStorage` and in a `?mode=` query param, so a shared link
carries the sender's choice. Standard also has light and dark themes; Dossier and
Spatial each commit to one visual world.

### Standard — "pattern paper"

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

### Spatial

Four exhibits, all procedural — no meshes, no textures, no `.glb`:

| Exhibit | What it demonstrates |
|---|---|
| Render passes | Beauty / albedo / normal / depth / AO / cost on a raymarched SDF scene |
| Garment solver | Real position-based dynamics cloth. Drag to pull, double-click to tear |
| Path tracer | Progressive Monte Carlo, one sample per pixel per frame, accumulating |
| Toon water | Banded shading with a foam line where the surface meets geometry |

The whole mode is ~27 kB of JavaScript. The office scene it replaced was 85 MB of
models. Escape always exits.

---

## Contact form

Works on GitHub Pages with no backend. Sign up at
[Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com), then:

```sh
echo 'VITE_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_ID' > .env
```

Without it the form doesn't pretend — it renders a mailto prompt instead of a text
box that throws messages away.

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
    standard/       Default. Pattern-paper design system
    dossier/        The theme, as an opt-in skin
    spatial/        WebGL exhibits. Lazy-loaded behind React.lazy
  ModeContext.tsx   Which mode, persisted
  ThemeContext.tsx  Light/dark for Standard
  index.css         Design tokens, the seam system, motion
```

Everything reads from `content/`. A mode is a renderer, never a content store.
