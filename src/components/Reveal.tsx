import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered reveal. One shared idea used everywhere, so the whole page
 * moves with a single rhythm instead of each section inventing its own.
 *
 * `as="seam"` runs the stitch: the dashed rule draws left to right like a
 * needle laying a seam. Everything else rises a few pixels and fades.
 *
 * FAIL-SAFE BY DESIGN. The hidden start state is a bet that the reveal will
 * fire, and a portfolio that renders blank when that bet loses is worse than
 * one with no animation at all. So there are three independent ways to become
 * visible: the observer, a synchronous in-viewport check at mount, and a
 * timeout. Any one of them is enough.
 */
export default function Reveal({
  children,
  delay = 0,
  as = 'rise',
  className = '',
}: {
  children?: React.ReactNode;
  delay?: number;
  as?: 'rise' | 'seam' | 'deal';
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // 1. No observer support: show it and move on.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    // 2. Already on screen at mount (the hero). Don't wait for a scroll that
    //    may never come.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);

    // 3. Last resort. If nothing has fired by now something is wrong with the
    //    environment, and visible content beats a correct animation.
    const failsafe = window.setTimeout(() => setShown(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const variant =
    as === 'seam' ? 'seam anim-seam' : as === 'deal' ? 'anim-deal' : 'anim-rise';
  const classes = `${variant} ${shown ? 'is-in' : ''} ${className}`;

  if (as === 'seam') {
    return (
      <hr
        ref={ref as React.RefObject<HTMLHRElement>}
        className={classes}
        style={{ animationDelay: `${delay}ms` }}
      />
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={classes}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
