import React from 'react';
import { Link } from 'react-router-dom';

import ModeSwitch from '../../components/ModeSwitch';
import { profile } from '../../content/profile';

const NAV = [
  { label: 'Subject', href: '/#subject' },
  { label: 'Case files', href: '/#cases' },
  { label: 'Record', href: '/#record' },
  { label: 'Contact', href: '/#contact' },
];

export default function DossierShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: '#2a2724',
        backgroundImage:
          'radial-gradient(ellipse at 50% 0%, rgba(255,247,224,.10), transparent 62%), url(/images/desk-bg.webp)',
        backgroundSize: 'auto, 1100px',
        backgroundRepeat: 'no-repeat, repeat',
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:px-4 focus:py-2 type-label"
        style={{ background: 'var(--color-dossier-paper)', color: 'var(--color-dossier-ink)' }}
      >
        Skip to content
      </a>

      {/* The header is a folder tab: the manila strip you'd grab to pull the
          file out. Uses the folder texture that was already in the project. */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          borderColor: 'rgba(0,0,0,.45)',
          backgroundImage: 'url(/images/folderText.webp)',
          backgroundSize: 'cover',
          boxShadow: '0 6px 18px rgba(0,0,0,.45)',
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 md:px-8">
          <Link
            to="/"
            className="font-display text-sm font-black uppercase tracking-[0.14em] text-[#f4efe2] drop-shadow"
          >
            Case file — {profile.shortName} Meneses
          </Link>

          <nav aria-label="Sections" className="hidden items-center gap-6 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="type-label text-[#e5dcc6] transition-opacity hover:opacity-70"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ModeSwitch compact />
        </div>
      </header>

      <main id="main" className="relative mx-auto w-full max-w-6xl px-4 pb-24 md:px-8">
        {children}
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-8">
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-t pt-4 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ borderColor: 'rgba(255,255,255,.16)', color: '#a89e8a' }}
        >
          <span>End of file — {profile.name}</span>
          <span className="flex gap-5">
            {profile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </span>
        </div>
      </footer>
    </div>
  );
}
