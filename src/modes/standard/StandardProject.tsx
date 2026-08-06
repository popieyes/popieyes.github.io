import { Link } from 'react-router-dom';

import StandardShell from './StandardShell';
import Gallery from '../../components/Gallery';
import Reveal from '../../components/Reveal';
import { projects } from '../../content/projects';
import type { Project } from '../../content/types';

function Prose({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-4">
      {text.split('\n\n').map((paragraph, index) => (
        <p key={index} className="measure text-[0.95rem] leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function StandardProject({ project }: { project: Project }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <StandardShell>
      <article className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <div className="pt-8">
          <Link
            to="/#work"
            className="type-label transition-opacity hover:opacity-60"
            style={{ color: 'var(--fg-muted)' }}
          >
            ← All projects
          </Link>
        </div>

        <header className="flex flex-col gap-4 pt-8">
          <Reveal>
            <p className="type-label" style={{ color: 'var(--accent)' }}>
              {project.kind}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="type-display text-[clamp(2rem,6vw,3.6rem)]">{project.title}</h1>
          </Reveal>
          <Reveal as="seam" delay={160} />

          <dl className="grid gap-x-8 gap-y-4 pt-2 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex flex-col gap-0.5">
              <dt className="type-label" style={{ color: 'var(--fg-muted)' }}>
                Role
              </dt>
              <dd className="text-sm">{project.role}</dd>
            </div>

            {project.year && (
              <div className="flex flex-col gap-0.5">
                <dt className="type-label" style={{ color: 'var(--fg-muted)' }}>
                  Period
                </dt>
                <dd className="text-sm">{project.year}</dd>
              </div>
            )}

            <div className="flex flex-col gap-0.5 sm:col-span-2">
              <dt className="type-label" style={{ color: 'var(--fg-muted)' }}>
                Built with
              </dt>
              <dd className="text-sm">{project.stack.join(' · ')}</dd>
            </div>
          </dl>

          {/* Only rendered when a link actually exists. The old page showed an
              "Access Source" button on every project, three of which had none. */}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="type-label border px-4 py-2.5 transition-opacity hover:opacity-70"
                  style={{ borderColor: 'var(--fg)', color: 'var(--fg)' }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>

        <Reveal delay={120} className="pt-10">
          <Gallery media={project.media} label={`${project.title} screenshots`} />
        </Reveal>

        <div className="grid gap-x-14 gap-y-10 pt-14 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <section className="flex flex-col gap-4">
              <h2 className="type-label" style={{ color: 'var(--accent)' }}>
                Overview
              </h2>
              <Prose text={project.overview} />
            </section>
          </Reveal>

          {project.technical && (
            <Reveal delay={110}>
              <section className="flex flex-col gap-4">
                <h2 className="type-label" style={{ color: 'var(--accent)' }}>
                  How it's built
                </h2>
                <Prose text={project.technical} />
              </section>
            </Reveal>
          )}
        </div>

        <nav className="pt-20">
          <hr className="seam" />
          <Link
            to={`/projects/${next.slug}`}
            className="flex flex-wrap items-baseline justify-between gap-3 pt-5 transition-opacity hover:opacity-70"
          >
            <span className="type-label" style={{ color: 'var(--fg-muted)' }}>
              Next project
            </span>
            <span
              className="type-display text-xl"
              style={{ fontVariationSettings: "'wdth' 105, 'wght' 650" }}
            >
              {next.title} →
            </span>
          </Link>
        </nav>
      </article>
    </StandardShell>
  );
}
