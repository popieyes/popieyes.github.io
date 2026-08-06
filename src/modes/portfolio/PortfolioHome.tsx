import { Link } from 'react-router-dom';

import PortfolioShell from './PortfolioShell';
import Reveal from '../../components/Reveal';
import { profile } from '../../content/profile';
import { experience } from '../../content/experience';
import { projects } from '../../content/projects';
import type { Project } from '../../content/types';

function SectionHead({
  label,
  title,
  aside,
  id,
}: {
  label: string;
  title: string;
  aside?: string;
  id: string;
}) {
  return (
    <div id={id} className="flex flex-col gap-3 pt-16 md:pt-24">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="type-label" style={{ color: 'var(--accent)' }}>
            {label}
          </p>
          {aside && (
            <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
              {aside}
            </p>
          )}
        </div>
      </Reveal>
      <Reveal delay={70}>
        <h2 className="type-display text-2xl md:text-4xl">{title}</h2>
      </Reveal>
      <Reveal as="seam" delay={140} />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cover = project.media[0];

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className="aspect-[16/10] overflow-hidden border"
        style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
      >
        <img
          src={cover.src}
          alt={cover.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className="type-display text-lg"
            style={{ fontVariationSettings: "'wdth' 105, 'wght' 650" }}
          >
            {project.title}
          </h3>
          {project.year && (
            <span className="type-label shrink-0" style={{ color: 'var(--fg-muted)' }}>
              {project.year}
            </span>
          )}
        </div>

        <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
          {project.kind}
        </p>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          {project.summary}
        </p>

        <ul className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="type-label border px-1.5 py-0.5"
              style={{ borderColor: 'var(--rule)', color: 'var(--fg-muted)' }}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default function PortfolioHome() {
  const [lead, ...rest] = profile.research.split('\n\n');

  return (
    <PortfolioShell>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {/* ── Hero ─────────────────────────────────────────────────────────
            Left: the claim. Right: the person, cut out like a pattern piece,
            with the spec beneath it. */}
        <section className="grid gap-10 pt-12 pb-4 md:grid-cols-[1.55fr_1fr] md:gap-14 md:pt-20">
          <div className="flex flex-col gap-5">
            <Reveal>
              <p className="type-label" style={{ color: 'var(--accent)' }}>
                {profile.role}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1
                className="type-display text-[clamp(2.1rem,6.5vw,4.2rem)]"
                style={{ fontVariationSettings: "'wdth' 115, 'wght' 750" }}
              >
                Real-time rendering, custom engines, and game development.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="measure text-base md:text-lg" style={{ color: 'var(--fg-muted)' }}>
                {profile.intro}
              </p>
            </Reveal>

            <Reveal delay={290}>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.cv && (
                  <a
                    href={profile.cv}
                    className="type-label px-4 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ background: 'var(--fg)', color: 'var(--bg)' }}
                  >
                    Download CV
                  </a>
                )}
                {profile.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="type-label border px-4 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: 'var(--fg)', color: 'var(--fg)' }}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={`mailto:${profile.email}`}
                  className="type-label border px-4 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--fg)', color: 'var(--fg)' }}
                >
                  Email
                </a>
              </div>
            </Reveal>
          </div>

          {/* Portrait + spec */}
          <div className="flex gap-6">
            <div className="seam-v hidden md:block" aria-hidden="true" />

            <div className="flex flex-1 flex-col gap-5">
              {/* Cut out along its seam, top to bottom — the one place the
                  motion answers to the image rather than the layout. */}
              <figure className="flex flex-col gap-2">
                <div
                  className="anim-unveil is-in overflow-hidden border p-1.5"
                  style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
                >
                  <img
                    src="/images/profile.webp"
                    alt="Santiago Meneses Gómez"
                    className="w-full object-cover"
                    style={{ aspectRatio: '4/5' }}
                    decoding="async"
                  />
                </div>
                <figcaption
                  className="notch type-label pl-3"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {profile.shortName}, Madrid
                </figcaption>
              </figure>

              <Reveal delay={260}>
                <dl className="flex flex-col gap-4">
                  {[
                    { term: 'Affiliation', value: profile.affiliation },
                    ...profile.skills.map((group) => ({
                      term: group.label,
                      value: group.items.join(' · '),
                    })),
                  ].map((row) => (
                    <div key={row.term} className="flex flex-col gap-0.5">
                      <dt className="type-label" style={{ color: 'var(--fg-muted)' }}>
                        {row.term}
                      </dt>
                      <dd className="text-sm">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Research ─────────────────────────────────────────────────── */}
        <section>
          <SectionHead
            id="research"
            label="Current research"
            title="What I work on at MSLab"
            aside="2025 — Ongoing"
          />
          <Reveal delay={60}>
            <p className="measure pt-7 text-base leading-relaxed md:text-lg">{lead}</p>
          </Reveal>
          <div className="grid gap-x-14 gap-y-5 pt-6 md:grid-cols-2">
            {rest.map((paragraph, index) => (
              <Reveal key={index} delay={120 + index * 90}>
                <p
                  className="text-[0.95rem] leading-relaxed"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Work ─────────────────────────────────────────────────────── */}
        <section>
          <SectionHead
            id="work"
            label="Selected work"
            title="Projects"
            aside={`${projects.length} projects`}
          />
          <div className="grid gap-x-8 gap-y-12 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────────────────── */}
        <section>
          <SectionHead id="experience" label="Record" title="Experience" />
          <ol className="flex flex-col pt-4">
            {experience.map((role, index) => (
              <li key={role.start}>
                <Reveal delay={index * 90}>
                  <div className="grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:gap-10">
                    <div className="flex flex-col gap-1">
                      <span className="type-label" style={{ color: 'var(--fg-muted)' }}>
                        {role.period}
                      </span>
                      {role.current && (
                        <span
                          className="notch type-label pl-3"
                          style={{ color: 'var(--marker)' }}
                        >
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3
                        className="type-display text-lg"
                        style={{ fontVariationSettings: "'wdth' 105, 'wght' 650" }}
                      >
                        {role.title}
                      </h3>
                      <p className="type-label" style={{ color: 'var(--accent)' }}>
                        {role.org}
                      </p>
                      <p
                        className="measure text-sm leading-relaxed"
                        style={{ color: 'var(--fg-muted)' }}
                      >
                        {role.notes}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section>
          <SectionHead
            id="contact"
            label="Get in touch"
            title="Contact"
            aside="Replies are usually within a few days"
          />
          <Reveal className="pt-8">
            <div className="flex flex-col gap-5">
              <p className="measure text-[0.95rem] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                Happy to talk about graphics work, research positions, or anything
                involving a renderer that misbehaves.
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="type-display text-xl underline underline-offset-4 transition-opacity hover:opacity-70 md:text-2xl"
                style={{ fontVariationSettings: "'wdth' 104, 'wght' 620" }}
              >
                {profile.email}
              </a>

              <div className="flex flex-wrap gap-2">
                {profile.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="type-label border px-4 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: 'var(--fg)', color: 'var(--fg)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <p className="type-label pt-1" style={{ color: 'var(--fg-muted)' }}>
                Off the clock: {profile.interests.join(', ').toLowerCase()}
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </PortfolioShell>
  );
}
