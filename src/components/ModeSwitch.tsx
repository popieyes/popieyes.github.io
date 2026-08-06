import { MODES, MODE_BLURBS, MODE_LABELS, useMode, type Mode } from '../ModeContext';

/**
 * The one control that has to look right on all three grounds, so it is styled
 * entirely from tokens. Reads as a set of tabs because that is what it is —
 * three views of one thing, not three destinations.
 */
export default function ModeSwitch({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useMode();

  return (
    <div
      role="tablist"
      aria-label="Choose how to view this portfolio"
      className="inline-flex items-stretch border"
      style={{ borderColor: 'var(--rule)' }}
    >
      {MODES.map((option: Mode) => {
        const isActive = option === mode;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            title={MODE_BLURBS[option]}
            onClick={() => setMode(option)}
            className={[
              'type-label px-3 py-2 transition-colors duration-200 cursor-pointer',
              compact ? 'text-[0.6rem]' : '',
              isActive ? 'font-semibold' : 'hover:opacity-100 opacity-60',
            ].join(' ')}
            style={{
              background: isActive ? 'var(--accent)' : 'transparent',
              color: isActive ? 'var(--bg)' : 'var(--fg)',
            }}
          >
            {MODE_LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}
