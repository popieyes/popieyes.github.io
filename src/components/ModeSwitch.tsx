import { MODE_BLURBS, MODE_LABELS, VISIBLE_MODES, useMode } from '../ModeContext';

/**
 * Reads as tabs because that is what it is — two views of one body of work,
 * not two destinations. Styled entirely from tokens so it looks native in
 * whichever mode is showing.
 */
export default function ModeSwitch({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useMode();

  return (
    <div
      role="tablist"
      aria-label="Choose how to view this work"
      className="inline-flex items-stretch border"
      style={{ borderColor: 'var(--rule)' }}
    >
      {VISIBLE_MODES.map((option) => {
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
              'type-label cursor-pointer px-3 py-2 transition-colors duration-200',
              compact ? 'text-[0.6rem]' : '',
              isActive ? 'font-semibold' : 'opacity-60 hover:opacity-100',
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
