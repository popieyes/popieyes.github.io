import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import PortfolioShell from '../portfolio/PortfolioShell';
import Reveal from '../../components/Reveal';
import ShaderCanvas from './ShaderCanvas';
import ClothExhibit from './ClothExhibit';
import { activeDemos, PROVENANCE_LABELS, type Demo } from './registry';
import { projects } from '../../content/projects';
import { useTheme } from '../../ThemeContext';

/** Says what you're looking at, every time. */
function Provenance({ demo }: { demo: Demo }) {
  const isReproduction = demo.provenance === 'rebuilt';

  return (
    <span
      className="type-label border px-2 py-1"
      style={{
        borderColor: isReproduction ? 'var(--marker)' : 'var(--accent)',
        color: isReproduction ? 'var(--marker)' : 'var(--accent)',
      }}
    >
      {PROVENANCE_LABELS[demo.provenance]}
    </span>
  );
}

function Stage({
  demo,
  values,
  theme,
}: {
  demo: Demo;
  values: Record<string, number>;
  theme: 'light' | 'dark';
}) {
  // The stage sits on the page's own surface rather than a fixed black, and
  // the shaders get uLight so their skies match the room they're rendered in.
  const frame = { borderColor: 'var(--rule)', background: 'var(--surface)' } as const;
  const uniforms = { ...values, uLight: theme === 'light' ? 1 : 0 };

  if (demo.kind === 'shader') {
    return (
      <div className="h-full w-full border" style={frame}>
        <ShaderCanvas
          fragment={demo.fragment}
          accumulate={demo.accumulate}
          // Theme is part of the reset key: a progressive render must start
          // over when the sky changes, or it averages two different scenes.
          resetKey={`${demo.id}-${theme}`}
          uniforms={uniforms}
          className="block h-full w-full"
        />
      </div>
    );
  }

  if (demo.kind === 'sim') {
    return (
      <div className="h-full w-full border" style={frame}>
        <ClothExhibit wind={values.wind ?? 0.35} theme={theme} />
      </div>
    );
  }

  if (demo.kind === 'video') {
    return (
      <div className="h-full w-full border" style={frame}>
        <video
          src={demo.src}
          poster={demo.poster}
          autoPlay
          muted
          loop
          playsInline
          controls
          className="block h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full border" style={frame}>
      <iframe
        src={demo.src}
        title={demo.title}
        allowFullScreen
        className="block h-full w-full"
        style={{ border: 0 }}
      />
    </div>
  );
}

export default function DemosHome() {
  const { resolved } = useTheme();
  const [activeId, setActiveId] = useState(activeDemos[0]?.id);
  const demo = activeDemos.find((item) => item.id === activeId) ?? activeDemos[0];

  // One value bag per demo, seeded from each control's midpoint or first option.
  const [values, setValues] = useState<Record<string, Record<string, number>>>(() => {
    const seed: Record<string, Record<string, number>> = {};
    for (const item of activeDemos) {
      seed[item.id] = {};
      for (const control of item.controls ?? []) {
        seed[item.id][control.id] =
          control.kind === 'segmented' ? 0 : (control.min + control.max) / 2;
      }
      if (item.kind === 'sim') seed[item.id].wind = 0.35;
    }
    return seed;
  });

  const current = useMemo(() => values[demo?.id ?? ''] ?? {}, [values, demo]);

  function setValue(id: string, next: number) {
    if (!demo) return;
    setValues((prev) => ({ ...prev, [demo.id]: { ...prev[demo.id], [id]: next } }));
  }

  // Left/right cycle exhibits, matching the gallery's keyboard behaviour.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      const index = activeDemos.findIndex((item) => item.id === activeId);
      if (index < 0) return;
      if (event.key === 'ArrowRight') {
        setActiveId(activeDemos[(index + 1) % activeDemos.length].id);
      }
      if (event.key === 'ArrowLeft') {
        setActiveId(activeDemos[(index - 1 + activeDemos.length) % activeDemos.length].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId]);

  if (!demo) {
    return (
      <PortfolioShell>
        <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
          <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
            No demos are switched on right now.
          </p>
        </div>
      </PortfolioShell>
    );
  }

  const project = demo.projectSlug
    ? projects.find((item) => item.slug === demo.projectSlug)
    : undefined;

  return (
    <PortfolioShell>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-3 pt-12 md:pt-16">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="type-label" style={{ color: 'var(--accent)' }}>
                Demos
              </p>
              <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
                {activeDemos.length} running · ← → to switch
              </p>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="type-display text-2xl md:text-4xl">
              Things running live in your browser
            </h1>
          </Reveal>
          <Reveal as="seam" delay={140} />
          <Reveal delay={180}>
            <p
              className="measure pt-3 text-[0.95rem] leading-relaxed"
              style={{ color: 'var(--fg-muted)' }}
            >
              Each exhibit says whether it's code running now, a browser
              reproduction of a technique from one of my projects, or a capture
              of a native build. Nothing here downloads geometry — the shaders
              and the solver are all maths.
            </p>
          </Reveal>
        </div>

        {/* Selector — same button language as the rest of the site. */}
        <div className="flex flex-wrap gap-2 pt-8">
          {activeDemos.map((item) => {
            const isActive = item.id === demo.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(item.id)}
                className="type-label cursor-pointer border px-4 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  borderColor: isActive ? 'var(--fg)' : 'var(--rule)',
                  background: isActive ? 'var(--fg)' : 'transparent',
                  color: isActive ? 'var(--bg)' : 'var(--fg-muted)',
                }}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="pt-6">
          <div
            className="w-full"
            style={{
              aspectRatio:
                demo.kind === 'embed' ? String(demo.ratio ?? 16 / 9) : '16 / 9',
            }}
          >
            <Stage demo={demo} values={current} theme={resolved} />
          </div>

          <div className="flex flex-wrap items-start justify-between gap-6 pt-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2
                  className="type-display text-lg"
                  style={{ fontVariationSettings: "'wdth' 105, 'wght' 650" }}
                >
                  {demo.title}
                </h2>
                <Provenance demo={demo} />
              </div>
              <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
                {demo.sub}
              </p>
              <p className="measure text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                {demo.caption}
              </p>
              {project && (
                <Link
                  to={`/projects/${project.slug}`}
                  className="type-label pt-1 underline underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: 'var(--fg)' }}
                >
                  Read about {project.title} →
                </Link>
              )}
            </div>

            {demo.controls && demo.controls.length > 0 && (
              <div className="flex flex-col items-start gap-3 md:items-end">
                {demo.controls.map((control) =>
                  control.kind === 'segmented' ? (
                    <div
                      key={control.id}
                      role="group"
                      aria-label={control.label}
                      className="flex flex-wrap border"
                      style={{ borderColor: 'var(--rule)' }}
                    >
                      {control.options.map((option, index) => {
                        const isOn = (current[control.id] ?? 0) === index;
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={isOn}
                            onClick={() => setValue(control.id, index)}
                            className="type-label cursor-pointer px-3 py-2 transition-colors"
                            style={{
                              background: isOn ? 'var(--accent)' : 'transparent',
                              color: isOn ? 'var(--bg)' : 'var(--fg-muted)',
                              fontWeight: isOn ? 600 : 400,
                            }}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <label
                      key={control.id}
                      className="flex items-center gap-3 border px-4 py-2.5"
                      style={{ borderColor: 'var(--rule)' }}
                    >
                      <span className="type-label" style={{ color: 'var(--fg-muted)' }}>
                        {control.label}
                      </span>
                      <input
                        type="range"
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        value={current[control.id] ?? control.min}
                        onChange={(event) => setValue(control.id, Number(event.target.value))}
                        className="w-32"
                        style={{ accentColor: 'var(--accent)' }}
                      />
                    </label>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PortfolioShell>
  );
}
