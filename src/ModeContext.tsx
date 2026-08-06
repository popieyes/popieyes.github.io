import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const MODES = ['standard', 'dossier', 'spatial'] as const;
export type Mode = (typeof MODES)[number];

export const MODE_LABELS: Record<Mode, string> = {
  standard: 'Standard',
  dossier: 'Dossier',
  spatial: 'Spatial',
};

export const MODE_BLURBS: Record<Mode, string> = {
  standard: 'Everything, plainly laid out',
  dossier: 'The same work, in costume',
  spatial: 'Live demos in the browser',
};

const STORAGE_KEY = 'portfolio:mode';

function isMode(value: string | null): value is Mode {
  return value !== null && (MODES as readonly string[]).includes(value);
}

/**
 * Resolution order: an explicit ?mode= in the URL wins, so a shared link always
 * lands where the sender intended. Otherwise fall back to what this visitor
 * chose last. Otherwise Standard.
 */
function resolveInitialMode(): Mode {
  if (typeof window === 'undefined') return 'standard';

  const fromUrl = new URLSearchParams(window.location.search).get('mode');
  if (isMode(fromUrl)) return fromUrl;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isMode(stored)) return stored;
  } catch {
    /* Private browsing or storage disabled — Standard is a fine answer. */
  }

  return 'standard';
}

type ModeContextValue = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  /** True until the visitor has actively chosen, so we can avoid nagging. */
  isDefault: boolean;
};

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(resolveInitialMode);
  const [isDefault, setIsDefault] = useState(
    () => !isMode(new URLSearchParams(window.location.search).get('mode'))
  );

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    setIsDefault(false);

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Non-fatal: the mode still applies for this session. */
    }

    // Keep the URL truthful without adding a history entry per toggle —
    // the back button should undo navigation, not costume changes.
    const url = new URL(window.location.href);
    if (next === 'standard') {
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

  const value = useMemo(
    () => ({ mode, setMode, isDefault }),
    [mode, setMode, isDefault]
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeContextValue {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used inside a ModeProvider');
  }
  return context;
}
