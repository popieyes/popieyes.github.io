import { Link } from 'react-router-dom';

import PortfolioShell from './PortfolioShell';
import Gallery from '../../components/Gallery';
import Reveal from '../../components/Reveal';
import { projects } from '../../content/projects';
import type { Media, Project } from '../../content/types';

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

/** A plain figure — sized to the image, never letterboxed, never cropped. */
function Plate({ item, priority = false }: { item: Media; priority?: boolean }) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="overflow-hidden border" style={{ borderColor: 'var(--rule)' }}>
        <img
          src={item.src}
          alt={item.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="type-label" style={{ color: 'var(--fg-muted)' }}>
        {item.caption ?? item.alt}
      </figcaption>
    </figure>
  );
}

function Body({ project }: { project: Project }) {
  const layout = project.mediaLayout ?? 'carousel';

  const writeUp = (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="type-label" style={{ color: 'var(--accent)' }}>
          Overview
        </h2>
        <Prose text={project.overview} />
      </section>

      {project.technical && (
        <section className="flex flex-col gap-4">
          <h2 className="type-label" style={{ color: 'var(--accent)' }}>
            How it's built
          </h2>
          <Prose text={project.technical} />
        </section>
      )}
    </div>
  );

  if (layout === 'aside') {
    return (
      <div className="grid gap-x-14 gap-y-10 pt-10 lg:grid-cols-[1fr_1fr]">
        <Reveal>{writeUp}</Reveal>
        <div className="flex flex-col gap-8">
          {project.media.map((item, index) => (
            <Reveal key={item.src} delay={index * 70}>
              <Plate item={item} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    );
  }

  if (layout === 'grid') {
    return (
      <>
        <Reveal className="pt-10">{writeUp}</Reveal>
        <div className="grid gap-8 pt-12 sm:grid-cols-2">
          {project.media.map((item, index) => (
            <Reveal key={item.src} delay={index * 70}>
              <Plate item={item} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Reveal delay={120} className="pt-10">
        <Gallery media={project.media} label={`${project.title} screenshots`} />
      </Reveal>
      <Reveal className="pt-14">{writeUp}</Reveal>
    </>
  );
}

export default function PortfolioProject({ project }: { project: Project }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const hasSiblings = projects.length > 1;

  return (
    <PortfolioShell>
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

          {/* Only rendered when a link actually exists. */}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="type-label border px-4 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--fg)', color: 'var(--fg)' }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>

        <Body project={project} />

        {/* Both directions. Forward-only left you unable to get back to the
            project you just came from without going via the index. */}
        {hasSiblings && (
          <nav className="pt-20" aria-label="Project navigation">
            <hr className="seam" />
            <div className="grid gap-6 pt-5 sm:grid-cols-2">
              <Link
                to={`/projects/${previous.slug}`}
                className="flex flex-col gap-1 transition-opacity hover:opacity-70"
              >
                <span className="type-label" style={{ color: 'var(--fg-muted)' }}>
                  ← Previous
                </span>
                <span
                  className="type-display text-lg"
                  style={{ fontVariationSettings: "'wdth' 105, 'wght' 650" }}
                >
                  {previous.title}
                </span>
              </Link>

              <Link
                to={`/projects/${next.slug}`}
                className="flex flex-col gap-1 transition-opacity hover:opacity-70 sm:items-end sm:text-right"
              >
                <span className="type-label" style={{ color: 'var(--fg-muted)' }}>
                  Next →
                </span>
                <span
                  className="type-display text-lg"
                  style={{ fontVariationSettings: "'wdth' 105, 'wght' 650" }}
                >
                  {next.title}
                </span>
              </Link>
            </div>
          </nav>
        )}
      </article>
    </PortfolioShell>
  );
}
