import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';

import { ModeProvider, useMode } from './ModeContext';
import { ThemeProvider } from './ThemeContext';
import { getProject } from './content/projects';

import StandardHome from './modes/standard/StandardHome';
import StandardProject from './modes/standard/StandardProject';
import DossierHome from './modes/dossier/DossierHome';
import DossierProject from './modes/dossier/DossierProject';

/* Spatial pulls in three.js and the WebGL exhibits. It must never be part of
   the initial bundle — nobody pays for it until they ask for it. */
const SpatialHome = lazy(() => import('./modes/spatial/SpatialHome'));

function SpatialFallback() {
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
  if (mode === 'spatial') {
    return (
      <Suspense fallback={<SpatialFallback />}>
        <SpatialHome />
      </Suspense>
    );
  }
  return <StandardHome />;
}

function ProjectRoute() {
  const { slug } = useParams();
  const { mode } = useMode();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <NotFound />;

  /* Spatial has no per-project page of its own — its exhibits live on the
     landing view — so a project link there falls back to the Standard write-up.
     Better to show the work than to invent a page that says nothing. */
  if (mode === 'dossier') return <DossierProject project={project} />;
  return <StandardProject project={project} />;
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
