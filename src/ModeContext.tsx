import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const MODES = ['portfolio', 'demos', 'dossier'] as const;
export type Mode = (typeof MODES)[number];

/**
 * What the switch offers. Dossier is built and reachable at ?mode=dossier, but
 * it stays out of the UI until it's finished — a half-done costume is worse
 * than no costume. Add it back here to ship it.
 */
export const VISIBLE_MODES: Mode[] = ['portfolio', 'demos'];

export const MODE_LABELS: Record<Mode, string> = {
  portfolio: 'Portfolio',
  demos: 'Demos',
  dossier: 'Dossier',
};

export const MODE_BLURBS: Record<Mode, string> = {
  portfolio: 'The work, written up',
  demos: 'Things running live in your browser',
  dossier: 'The same work, in costume',
};

const STORAGE_KEY = 'portfolio:mode';

function isMode(value: string | null): value is Mode {
  return value !== null && (MODES as readonly string[]).includes(value);
}

/**
 * Resolution order: an explicit ?mode= in the URL wins, so a shared link always
 * lands where the sender intended. Otherwise fall back to what this visitor
 * chose last. Otherwise the portfolio.
 */
function resolveInitialMode(): Mode {
  if (typeof window === 'undefined') return 'portfolio';

  const fromUrl = new URLSearchParams(window.location.search).get('mode');
  if (isMode(fromUrl)) return fromUrl;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isMode(stored)) return stored;
  } catch {
    /* Private browsing or storage disabled — the portfolio is a fine answer. */
  }

  return 'portfolio';
}

type ModeContextValue = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(resolveInitialMode);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Non-fatal: the mode still applies for this session. */
    }

    // Keep the URL truthful without adding a history entry per toggle — the
    // back button should undo navigation, not view changes.
    const url = new URL(window.location.href);
    if (next === 'portfolio') {
      url.searchParams.delete('mode');
    } else {
      url.searchParams.set('mode', next);
    }
    window.history.replaceState({}, '', url);
  }, []);

  // The mode drives the token set in index.css, so it lives on <html>.
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeContextValue {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used inside a ModeProvider');
  }
  return context;
}
