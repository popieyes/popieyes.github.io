import { Link } from 'react-router-dom';

import DossierShell from './DossierShell';
import { Barcode, FieldRow, PaperStack, Pushpin, Redaction, Sheet, Stamp } from './parts';
import ContactForm from '../../components/ContactForm';
import Reveal from '../../components/Reveal';
import { profile } from '../../content/profile';
import { experience } from '../../content/experience';
import { projects } from '../../content/projects';

function Divider({ label }: { label: string }) {
  return (
    <div
      className="mb-5 flex items-baseline gap-3 border-b-2 pb-2"
      style={{ borderColor: 'var(--color-dossier-ink)' }}
    >
      <h2 className="font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
        {label}
      </h2>
    </div>
  );
}

export default function DossierHome() {
  const stampTone = (stamp: string) => (stamp === 'ACTIVE' || stamp === 'ONGOING' ? 'red' : 'green');

  return (
    <DossierShell>
      <PaperStack side="left" />
      <PaperStack side="right" />

      {/* ═══ THE FILE ═══ */}
      <section id="subject" className="relative z-10 pt-10">
        <Reveal as="deal">
        <Sheet className="p-5 md:p-10">
          <div
            className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b pb-3 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ borderColor: 'var(--color-dossier-line)' }}
          >
            <span className="opacity-70">File 01 — Personnel</span>
            <span className="text-right leading-relaxed">
              {profile.affiliation}
              <br />
              {profile.location}
            </span>
          </div>

          <div
            className="mb-6 border-b-2 pb-4"
            style={{ borderColor: 'var(--color-dossier-ink)' }}
          >
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
              Subject
            </p>
            <h1 className="font-display text-[clamp(2rem,8vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tighter">
              Meneses Gómez
            </h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">
              {profile.role}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-12">
            {/* Identification */}
            <div className="md:col-span-3">
              <img
                src="/images/profile.webp"
                alt="Santiago Meneses Gómez"
                className="w-full border object-cover contrast-125 grayscale"
                style={{ borderColor: 'var(--color-dossier-line)', aspectRatio: '3/4' }}
                loading="lazy"
                decoding="async"
              />
              <div className="mt-3 flex flex-col font-mono">
                <FieldRow term="Name" value={profile.shortName} />
                <FieldRow term="Role" value="Graphics Prg." />
                <FieldRow term="Base" value="Madrid, ES" />
                <FieldRow term="Status" value="Active" />
              </div>
            </div>

            {/* Statement */}
            <div className="md:col-span-6">
              <h3 className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.18em]">
                01 — Overview
              </h3>
              <p className="mb-4 text-justify font-mono text-[12px] leading-relaxed">
                {profile.intro}
              </p>

              <h3 className="mb-2 mt-6 font-display text-[11px] font-bold uppercase tracking-[0.18em]">
                02 — Current research
              </h3>
              <p className="mb-3 text-justify font-mono text-[12px] leading-relaxed">
                {profile.research.split('\n\n')[0]}
              </p>
              <p className="text-justify font-mono text-[12px] leading-relaxed">
                Secondary thread covers <Redaction>scene vectorization to SVG</Redaction> — turning
                rendered geometry into resolution-independent output.
              </p>
            </div>

            {/* Competencies — never redacted. */}
            <div className="flex flex-col gap-3 md:col-span-3">
              {profile.skills.map((group) => (
                <div
                  key={group.label}
                  className="border p-2.5"
                  style={{
                    borderColor: 'var(--color-dossier-line)',
                    background: 'rgba(0,0,0,.045)',
                  }}
                >
                  <p
                    className="mb-1.5 border-b pb-1 font-mono text-[9px] uppercase tracking-[0.16em] opacity-70"
                    style={{ borderColor: 'var(--color-dossier-line)' }}
                  >
                    {group.label}
                  </p>
                  <ul className="font-mono text-[10.5px] leading-relaxed">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex items-start justify-between gap-2 pt-1">
                <Stamp tone="green">Verified</Stamp>
                <img
                  src="/images/seal.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-16 opacity-50 mix-blend-multiply"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Sheet>
        </Reveal>
      </section>

      {/* ═══ CASE FILES ═══ */}
      <section id="cases" className="relative z-10 pt-8">
        <Reveal as="deal">
        <Sheet className="p-5 md:p-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                Appendix C
              </p>
              <h2 className="font-display text-3xl font-black uppercase tracking-tighter md:text-5xl">
                Case files
              </h2>
            </div>
            <Barcode label={`SYS-${projects.length}-4491`} />
          </div>

          <div
            className="grid border-l border-t sm:grid-cols-2 lg:grid-cols-3"
            style={{ borderColor: 'var(--color-dossier-line)' }}
          >
            {projects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="group flex flex-col gap-2.5 border-b border-r p-4 transition-colors duration-300 hover:bg-[rgba(0,0,0,.05)]"
                style={{ borderColor: 'var(--color-dossier-line)' }}
              >
                <div className="flex items-start justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.16em] opacity-70">
                  <span>{project.dossier.caseId}</span>
                  <span
                    className="border px-1"
                    style={{
                      borderColor:
                        stampTone(project.dossier.stamp) === 'red'
                          ? 'var(--color-dossier-red)'
                          : 'currentColor',
                      color:
                        stampTone(project.dossier.stamp) === 'red'
                          ? 'var(--color-dossier-red)'
                          : 'inherit',
                    }}
                  >
                    {project.dossier.stamp}
                  </span>
                </div>

                <h3 className="font-display text-lg font-black uppercase leading-none tracking-tight">
                  {project.title}
                </h3>

                <p
                  className="border-b pb-2 font-mono text-[9.5px] uppercase tracking-[0.12em] opacity-70"
                  style={{ borderColor: 'var(--color-dossier-line)' }}
                >
                  {project.kind}
                  {project.year ? ` · ${project.year}` : ''}
                </p>

                <div
                  className="relative border p-1"
                  style={{
                    borderColor: 'var(--color-dossier-line)',
                    background: 'rgba(0,0,0,.08)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 z-10 size-2 border-l border-t"
                    style={{ borderColor: 'var(--color-dossier-ink)' }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 z-10 size-2 border-b border-r"
                    style={{ borderColor: 'var(--color-dossier-ink)' }}
                  />
                  <img
                    src={project.media[0].src}
                    alt={project.media[0].alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover opacity-90 contrast-125 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <p className="flex-grow font-mono text-[10px] leading-relaxed">{project.summary}</p>

                <div
                  className="mt-auto flex items-center justify-between border-t border-dashed pt-2 font-mono text-[9px] uppercase"
                  style={{ borderColor: 'var(--color-dossier-line)' }}
                >
                  <span className="opacity-60">Methodology</span>
                  <span
                    className="px-1.5 py-0.5"
                    style={{
                      background: 'var(--color-dossier-ink)',
                      color: 'var(--color-dossier-paper)',
                    }}
                  >
                    {project.stack.slice(0, 2).join(' / ')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Sheet>
        </Reveal>
      </section>

      {/* ═══ SERVICE RECORD (the real one) ═══ */}
      <section id="record" className="relative z-10 pt-8">
        <Reveal as="deal">
        <Sheet className="p-5 md:p-10">
          <Divider label="Deployment log" />

          <div
            className="border-l border-t"
            style={{ borderColor: 'var(--color-dossier-line)' }}
          >
            {experience.map((role) => (
              <div key={role.start} className="grid md:grid-cols-12">
                <div
                  className="group flex flex-col justify-between border-b border-r p-4 font-mono md:col-span-3"
                  style={{ borderColor: 'var(--color-dossier-line)' }}
                >
                  <div className="text-[11px] font-bold">{role.period}</div>
                  <div className="mt-4">
                    <span
                      className="border px-1 py-[2px] text-[9px] uppercase tracking-[0.16em]"
                      style={{
                        borderColor: role.current ? 'var(--color-dossier-red)' : 'currentColor',
                        color: role.current ? 'var(--color-dossier-red)' : 'inherit',
                        opacity: role.current ? 1 : 0.6,
                      }}
                    >
                      [{role.current ? 'Active' : role.kind === 'study' ? 'Study' : 'Archived'}]
                    </span>
                  </div>
                </div>

                <div
                  className="border-b border-r p-4 md:col-span-9 md:p-6"
                  style={{ borderColor: 'var(--color-dossier-line)' }}
                >
                  <h3 className="mb-1.5 font-display text-xl font-black uppercase leading-none tracking-tight">
                    {role.title}
                  </h3>
                  <div
                    className="mb-3 flex items-center gap-2 border-b pb-2 font-mono text-[9.5px] uppercase tracking-[0.16em] opacity-70"
                    style={{ borderColor: 'var(--color-dossier-line)' }}
                  >
                    <span
                      className="inline-block size-1.5"
                      style={{ background: 'var(--color-dossier-ink)' }}
                    />
                    {role.org}
                  </div>
                  <p className="font-mono text-[11.5px] leading-relaxed">{role.notes}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-1 flex justify-between border-b pb-1 font-mono text-[9px] uppercase tracking-[0.16em] opacity-60"
            style={{ borderColor: 'var(--color-dossier-line)' }}
          >
            <span>End of record</span>
            <span>Off the clock: {profile.interests.join(', ').toLowerCase()}</span>
          </div>
        </Sheet>
        </Reveal>
      </section>

      {/* ═══ CONTACT — the tear-off slip ═══ */}
      <section id="contact" className="relative z-10 pt-8">
        <div className="relative mx-auto max-w-3xl">
          <Sheet pin={false} className="p-5 md:p-10" style={{ background: '#dedbd1' }}>
            <Pushpin className="absolute left-6 top-3 z-20 size-5" color="blue" />
            <Pushpin className="absolute right-6 top-3 z-20 size-5" color="blue" />

            <div className="mx-auto max-w-2xl">
              <h2 className="text-center font-display text-xl font-black uppercase tracking-[0.16em]">
                Secure comms
              </h2>
              <p className="mb-8 mt-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
                Direct transmission to subject: {profile.shortName}
              </p>

              <ContactForm tone="dossier" />
            </div>
          </Sheet>
        </div>
      </section>
    </DossierShell>
  );
}
