import { useCallback, useEffect, useState } from 'react';

import type { Media } from '../content/types';

/**
 * Images size to their own aspect ratio — `h-auto`, no fixed frame, no
 * `object-contain`. A letterboxed screenshot sitting in a band of empty colour
 * looks like a bug, and cropping to a uniform ratio throws away the parts of a
 * render that were the point of the shot.
 *
 * Bounds are clamped to length - 1. The previous implementation clamped to
 * `length`, which let the index run one past the end onto an undefined src.
 */
export default function Gallery({ media, label }: { media: Media[]; label: string }) {
  const [index, setIndex] = useState(0);

  // Reset when the project changes, so opening a second project doesn't
  // inherit the first one's position into a shorter array.
  useEffect(() => {
    setIndex(0);
  }, [media]);

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => {
        const next = current + delta;
        if (next < 0) return media.length - 1;
        if (next > media.length - 1) return 0;
        return next;
      });
    },
    [media.length]
  );

  useEffect(() => {
    if (media.length < 2) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, media.length]);

  if (media.length === 0) return null;

  const current = media[index];
  const hasMany = media.length > 1;

  return (
    <figure className="flex flex-col gap-3" aria-roledescription="carousel" aria-label={label}>
      <div className="relative overflow-hidden border" style={{ borderColor: 'var(--rule)' }}>
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="block h-auto w-full"
          decoding="async"
        />

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer border px-3 py-2 backdrop-blur-sm transition-opacity hover:opacity-80"
              style={{
                borderColor: 'var(--rule)',
                background: 'color-mix(in srgb, var(--bg) 82%, transparent)',
                color: 'var(--fg)',
              }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border px-3 py-2 backdrop-blur-sm transition-opacity hover:opacity-80"
              style={{
                borderColor: 'var(--rule)',
                background: 'color-mix(in srgb, var(--bg) 82%, transparent)',
                color: 'var(--fg)',
              }}
            >
              →
            </button>
          </>
        )}
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3">
        <span className="type-label" style={{ color: 'var(--fg-muted)' }}>
          {current.caption ?? current.alt}
        </span>
        {hasMany && (
          <span className="type-label shrink-0 tabular-nums" style={{ color: 'var(--fg-muted)' }}>
            {index + 1} / {media.length}
          </span>
        )}
      </figcaption>

      {hasMany && (
        <ul className="flex flex-wrap gap-2">
          {media.map((item, itemIndex) => (
            <li key={item.src}>
              <button
                type="button"
                onClick={() => setIndex(itemIndex)}
                aria-label={`Show image ${itemIndex + 1}: ${item.alt}`}
                aria-current={itemIndex === index}
                className="block h-12 w-16 cursor-pointer overflow-hidden border transition-opacity"
                style={{
                  borderColor: itemIndex === index ? 'var(--accent)' : 'var(--rule)',
                  opacity: itemIndex === index ? 1 : 0.55,
                }}
              >
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}
