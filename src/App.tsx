import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';

import { ModeProvider, useMode } from './ModeContext';
import { ThemeProvider } from './ThemeContext';
import { getProject } from './content/projects';

import PortfolioHome from './modes/portfolio/PortfolioHome';
import PortfolioProject from './modes/portfolio/PortfolioProject';
import DossierHome from './modes/dossier/DossierHome';
import DossierProject from './modes/dossier/DossierProject';

/* Demos carry the WebGL exhibits. They must never be part of the initial
   bundle — nobody pays for them until they ask. */
const DemosHome = lazy(() => import('./modes/demos/DemosHome'));

function DemosFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
        Loading exhibits…
      </p>
    </div>
  );
}

function Home() {
  const { mode } = useMode();

  if (mode === 'dossier') return <DossierHome />;
  if (mode === 'demos') {
    return (
      <Suspense fallback={<DemosFallback />}>
        <DemosHome />
      </Suspense>
    );
  }
  return <PortfolioHome />;
}

function ProjectRoute() {
  const { slug } = useParams();
  const { mode } = useMode();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <NotFound />;

  /* Demos has no per-project page of its own — its exhibits live on the landing
     view — so a project link there falls back to the portfolio write-up. */
  if (mode === 'dossier') return <DossierProject project={project} />;
  return <PortfolioProject project={project} />;
}

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col gap-4 items-start">
        <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
          Error 404
        </p>
        <h1 className="type-display text-4xl md:text-6xl">
          There's nothing at this address.
        </h1>
        <p className="measure" style={{ color: 'var(--fg-muted)' }}>
          The page you asked for doesn't exist. The link may be out of date, or
          the project may have been renamed.
        </p>
        <Link
          to="/"
          className="type-label border px-4 py-2 transition-colors hover:opacity-80"
          style={{ borderColor: 'var(--fg)', color: 'var(--fg)' }}
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ModeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectRoute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
