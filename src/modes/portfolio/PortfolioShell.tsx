import React from 'react';
import { Link } from 'react-router-dom';

import ModeSwitch from '../../components/ModeSwitch';
import { useTheme } from '../../ThemeContext';
import { profile } from '../../content/profile';

const NAV = [
  { label: 'Research', href: '/#research' },
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  const next = resolved === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="type-label border px-3 py-2 transition-opacity hover:opacity-70 cursor-pointer"
      style={{ borderColor: 'var(--rule)', color: 'var(--fg-muted)' }}
    >
      {resolved === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}

export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:px-4 focus:py-2 type-label"
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      >
        Skip to content
      </a>

      <header
        className="sticky top-0 z-40 backdrop-blur-sm"
        style={{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)' }}
      >
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            <Link
              to="/"
              className="type-display text-base md:text-lg"
              style={{ fontVariationSettings: "'wdth' 108, 'wght' 700" }}
            >
              {profile.shortName}
              <span style={{ color: 'var(--fg-muted)' }}> Meneses</span>
            </Link>

            <nav aria-label="Sections" className="hidden md:flex items-center gap-7">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="type-label transition-opacity hover:opacity-60"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <ModeSwitch compact />
            </div>
          </div>
          <hr className="seam" />
        </div>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="mx-auto w-full max-w-6xl px-5 md:px-8 pb-10 pt-14">
        <hr className="seam" />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
          <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
            {profile.name} · {profile.location}
          </p>
          <div className="flex items-center gap-5">
            {profile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="type-label transition-opacity hover:opacity-60"
                style={{ color: 'var(--fg-muted)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
