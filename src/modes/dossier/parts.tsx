import React from 'react';

/**
 * Dossier primitives. Everything the original design was made of — pushpins,
 * paper, stamps, redaction, tape — extracted so the look can be composed
 * instead of copy-pasted. The old About.jsx duplicated ~200 lines of markup to
 * put decorative paper in the margins; here that is one <PaperStack/>.
 */

export function Pushpin({
  className = '',
  color = 'red',
}: {
  className?: string;
  color?: 'red' | 'blue' | 'green';
}) {
  const shades = {
    red: ['#e05a4e', '#7c1f19'],
    blue: ['#4e8ae0', '#1a3a72'],
    green: ['#5bb85f', '#1f5321'],
  }[color];

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block rounded-full ${className}`}
      style={{
        background: `radial-gradient(circle at 34% 30%, ${shades[0]} 18%, ${shades[1]} 100%)`,
        boxShadow: '0 3px 6px rgba(0,0,0,.55), inset 0 -1px 2px rgba(0,0,0,.4)',
      }}
    />
  );
}

/**
 * Redaction is DECORATIVE ONLY. It never covers a skill, a date, a role, or
 * anything a reader needs — the original blacked out its own competencies list,
 * which meant the theme was hiding the qualifications. The real text is always
 * exposed to assistive tech and revealed on hover or focus.
 */
export function Redaction({ children }: { children: React.ReactNode }) {
  const text = typeof children === 'string' ? children : undefined;

  return (
    <span
      tabIndex={0}
      aria-label={text}
      title="Hover to reveal"
      className="mx-[1px] inline-block cursor-help select-none rounded-[1px] px-1 transition-colors duration-300 hover:text-[#e8e6df] focus:text-[#e8e6df]"
      style={{ background: 'var(--color-dossier-ink)', color: 'transparent' }}
    >
      {children}
    </span>
  );
}

export function Sheet({
  children,
  className = '',
  pin = true,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  pin?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative border shadow-2xl ${className}`}
      style={{
        background: 'var(--color-dossier-paper)',
        borderColor: 'var(--color-dossier-line)',
        color: 'var(--color-dossier-ink)',
        ...style,
      }}
    >
      {pin && (
        <Pushpin className="absolute left-1/2 top-2 z-20 size-6 -translate-x-1/2 md:top-3 md:size-8" />
      )}
      {children}
    </div>
  );
}

/**
 * The blurred paper drift in the margins. Decorative, hidden from assistive
 * tech, and — critically — it renders no duplicate content and no second copy
 * of the contact form.
 */
export function PaperStack({ side }: { side: 'left' | 'right' }) {
  const rotations = side === 'left' ? [-7, -3, 1] : [6, 2, -2];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-24 hidden xl:block"
      style={{
        [side]: '-6rem',
        width: '22rem',
        filter: 'blur(3px)',
        opacity: 0.55,
      }}
    >
      {rotations.map((rotation, index) => (
        <div
          key={rotation}
          className="absolute h-96 w-full border shadow-xl"
          style={{
            background: 'var(--color-dossier-paper)',
            borderColor: 'var(--color-dossier-line)',
            transform: `rotate(${rotation}deg) translateY(${index * 2.2}rem)`,
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0 26px, rgba(26,25,23,.14) 26px 27px)',
            backgroundPosition: '0 3rem',
          }}
        />
      ))}
    </div>
  );
}

export function Stamp({
  children,
  tone = 'red',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'red' | 'green';
  className?: string;
}) {
  const color = tone === 'green' ? '#3f6b3a' : 'var(--color-dossier-red)';

  return (
    <span
      className={`inline-block border-2 border-dashed px-3 py-1.5 font-display text-sm font-black uppercase tracking-[0.18em] ${className}`}
      style={{ borderColor: color, color, transform: 'rotate(-4deg)' }}
    >
      {children}
    </span>
  );
}

export function Barcode({ label }: { label: string }) {
  // Deterministic from the label, so a given file always prints the same code.
  const bars = Array.from({ length: 26 }, (_, index) => {
    const seed = label.charCodeAt(index % label.length) + index * 7;
    return (seed % 3) + 1;
  });

  return (
    <div className="flex flex-col items-end gap-1" aria-hidden="true">
      <div className="flex h-6 items-stretch gap-[2px]">
        {bars.map((width, index) => (
          <span
            key={index}
            style={{ width: `${width}px`, background: 'var(--color-dossier-ink)' }}
          />
        ))}
      </div>
      <span className="font-mono text-[8px] tracking-[0.2em]">{label}</span>
    </div>
  );
}

export function FieldRow({ term, value }: { term: string; value: string }) {
  return (
    <div
      className="flex justify-between gap-4 border-b py-1 text-[11px] uppercase"
      style={{ borderColor: 'var(--color-dossier-line)' }}
    >
      <span className="opacity-70">{term}</span>
      <strong className="text-right font-semibold">{value}</strong>
    </div>
  );
}
