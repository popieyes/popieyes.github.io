/**
 * The single source of truth for everything the site says.
 *
 * Two rules keep this honest and keep the three modes from tangling:
 *
 *  1. NO MARKUP IN DATA. Every string here is plain text. Renderers decide
 *     emphasis. A `<Redaction>` or `<br/>` must never appear in a value —
 *     that's what forced `dangerouslySetInnerHTML` into the old codebase and
 *     made half the project copy render as broken tags.
 *
 *  2. THEME FLAVOUR IS OPTIONAL AND SEGREGATED. Dossier-only garnish lives in
 *     the `dossier` block. The portfolio and demos ignore it entirely, so a
 *     costume change can never overwrite a fact.
 */

export type Link = {
  label: string;
  href: string;
};

export type Media = {
  src: string;
  alt: string;
  caption?: string;
};

/** Dossier-mode garnish. Decorative only — never load-bearing. */
export type DossierMeta = {
  /** Case number shown on the file card, e.g. "TECH-A". */
  caseId: string;
  /** Stamp text. Purely a mood label for the project's state. */
  stamp: 'ACTIVE' | 'CONTAINED' | 'CLASSIFIED' | 'ONGOING';
};

export type Project = {
  /** URL segment. Must be unique — it's the permalink. */
  slug: string;
  title: string;
  /** What kind of thing this is, in plain words. */
  kind: string;
  /**
   * Human-readable period. Omit entirely when the real date is unknown —
   * never substitute a placeholder.
   */
  year?: string;
  role: string;
  stack: string[];
  /** One line. Used on cards and in search results. */
  summary: string;
  /** Full prose. Plain text; blank lines separate paragraphs. */
  overview: string;
  /** Optional deeper technical write-up. Plain text. */
  technical?: string;
  links?: Link[];
  media: Media[];
  /**
   * How the images sit on the project page. Defaults to 'carousel'.
   *
   *   carousel  One at a time with thumbnails. Best when the shots are
   *             variations on the same view, or when there are many.
   *   aside     Images stack in a column beside the write-up. Best when each
   *             shot illustrates a different point in the text.
   *   grid      All of them, full width, below the write-up. Best for a small
   *             number of images that deserve to be seen at size.
   */
  mediaLayout?: 'carousel' | 'aside' | 'grid';
  /** Surfaced first on the landing page. */
  featured?: boolean;
  dossier: DossierMeta;
  /**
   * Id of the demo that demonstrates this project, if one exists.
   * See modes/demos/registry.ts.
   */
  exhibit?: string;
};

export type Role = {
  /** Machine-sortable start date, newest first. */
  start: string;
  end: string;
  /** Display period, e.g. "Jul 2025 — Feb 2026". */
  period: string;
  title: string;
  org: string;
  location?: string;
  /** Plain-text description. */
  notes: string;
  current?: boolean;
  kind: 'work' | 'study';
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  affiliation: string;
  location: string;
  /** Two or three sentences. The elevator pitch, in plain language. */
  intro: string;
  /** What the research actually is. Paragraphs separated by blank lines. */
  research: string;
  links: Link[];
  email: string;
  cv?: string;
  skills: SkillGroup[];
  interests: string[];
};
