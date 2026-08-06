import { Link } from 'react-router-dom';

import DossierShell from './DossierShell';
import { Barcode, PaperStack, Sheet, Stamp } from './parts';
import Gallery from '../../components/Gallery';
import { projects } from '../../content/projects';
import type { Project } from '../../content/types';

function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((paragraph, index) => (
        <p key={index} className="mb-3 text-justify font-mono text-[12px] leading-relaxed">
          {paragraph}
        </p>
      ))}
    </>
  );
}

export default function DossierProject({ project }: { project: Project }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const contained = project.dossier.stamp === 'CONTAINED';

  return (
    <DossierShell>
      <PaperStack side="left" />
      <PaperStack side="right" />

      <article className="relative z-10 pt-10">
        <Sheet className="p-5 md:p-10">
          <div
            className="mb-6 flex items-center justify-between border-b pb-3"
            style={{ borderColor: 'var(--color-dossier-line)' }}
          >
            <Link
              to="/#cases"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-[color:var(--color-dossier-red)]"
            >
              [ ← Return to archive ]
            </Link>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-60">
              {project.dossier.caseId}
            </span>
          </div>

          <header
            className="mb-8 flex flex-col justify-between gap-4 border-b-2 pb-4 md:flex-row md:items-start"
            style={{ borderColor: 'var(--color-dossier-ink)' }}
          >
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                Expanded report
              </p>
              <h1 className="font-display text-[clamp(1.9rem,7vw,3.8rem)] font-black uppercase leading-[0.92] tracking-tighter">
                {project.title}
              </h1>
            </div>
            <Stamp tone={contained ? 'green' : 'red'} className="shrink-0 self-start">
              {project.dossier.stamp}
            </Stamp>
          </header>

          <div
            className="mb-10 grid gap-8 border-b pb-10 md:grid-cols-12"
            style={{ borderColor: 'var(--color-dossier-line)' }}
          >
            <div className="md:col-span-8">
              <Gallery media={project.media} label={`${project.title} evidence`} />
            </div>

            <dl
              className="flex flex-col gap-4 font-mono text-[11px] uppercase tracking-wide md:col-span-4 md:border-l md:pl-6"
              style={{ borderColor: 'var(--color-dossier-line)' }}
            >
              {[
                { term: 'File reference', value: project.dossier.caseId },
                ...(project.year ? [{ term: 'Date of record', value: project.year }] : []),
                { term: 'Role', value: project.role },
                { term: 'Classification', value: project.kind },
              ].map((row) => (
                <div key={row.term}>
                  <dt
                    className="mb-1 border-b font-display text-[9px] font-bold tracking-[0.16em] opacity-60"
                    style={{ borderColor: 'var(--color-dossier-line)' }}
                  >
                    {row.term}
                  </dt>
                  <dd>{row.value}</dd>
                </div>
              ))}

              <div>
                <dt
                  className="mb-1 border-b font-display text-[9px] font-bold tracking-[0.16em] opacity-60"
                  style={{ borderColor: 'var(--color-dossier-line)' }}
                >
                  Methodology
                </dt>
                <dd
                  className="mt-1.5 inline-block px-2 py-1"
                  style={{
                    background: 'var(--color-dossier-ink)',
                    color: 'var(--color-dossier-paper)',
                  }}
                >
                  {project.stack.join(', ')}
                </dd>
              </div>

              {project.links && project.links.length > 0 && (
                <div className="mt-auto flex flex-col gap-2 pt-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block border-2 py-2 text-center transition-colors hover:bg-[color:var(--color-dossier-ink)] hover:text-[color:var(--color-dossier-paper)]"
                      style={{ borderColor: 'var(--color-dossier-ink)' }}
                    >
                      {link.label} [external]
                    </a>
                  ))}
                </div>
              )}
            </dl>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div
              className="hidden lg:col-span-2 lg:block lg:border-r"
              style={{ borderColor: 'var(--color-dossier-line)' }}
            >
              <Barcode label={project.dossier.caseId} />
            </div>

            <div className="lg:col-span-10">
              <section className="mb-8">
                <h2 className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                  Overview
                </h2>
                <Prose text={project.overview} />
              </section>

              {project.technical && (
                <section
                  className="border-l-4 p-4"
                  style={{
                    borderColor: 'var(--color-dossier-red)',
                    background: 'rgba(0,0,0,.05)',
                  }}
                >
                  <h2 className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                    Technical execution
                  </h2>
                  <Prose text={project.technical} />
                </section>
              )}
            </div>
          </div>

          <nav
            className="mt-10 flex flex-wrap items-baseline justify-between gap-3 border-t pt-4"
            style={{ borderColor: 'var(--color-dossier-line)' }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-60">
              Next file
            </span>
            <Link
              to={`/projects/${next.slug}`}
              className="font-display text-lg font-black uppercase tracking-tight transition-colors hover:text-[color:var(--color-dossier-red)]"
            >
              {next.title} →
            </Link>
          </nav>
        </Sheet>
      </article>
    </DossierShell>
  );
}
