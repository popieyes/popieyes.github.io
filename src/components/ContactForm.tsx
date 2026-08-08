import { useId, useState } from 'react';

import { profile } from '../content/profile';

/**
 * Set VITE_CONTACT_ENDPOINT in .env to your Formspree or Web3Forms URL.
 * Without it the form doesn't pretend: it renders as a mailto prompt instead
 * of a text box that silently throws messages away, which is what the previous
 * version did (three copies of it, each calling console.log).
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm({ tone = 'plain' }: { tone?: 'plain' | 'dossier' }) {
  // useId keeps these unique even when two forms mount — the old page shipped
  // three copies of id="auth_name", which broke every label association.
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const labels =
    tone === 'dossier'
      ? { name: 'Name', email: 'Return address', message: 'Message', submit: 'Transmit' }
      : { name: 'Your name', email: 'Your email', message: 'Message', submit: 'Send message' };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ENDPOINT) return;

    const form = event.currentTarget;
    setStatus('sending');
    setError(null);

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error(`Server returned ${response.status}`);

      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
      setError(
        `The message didn't send. Email ${profile.email} directly and it will reach me.`
      );
    }
  }

  if (!ENDPOINT) {
    return (
      <div
        className="flex flex-col gap-3 border p-6"
        style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
      >
        <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
          Contact form not configured
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          Add <code className="font-mono">VITE_CONTACT_ENDPOINT</code> to your{' '}
          <code className="font-mono">.env</code> to switch this on. Until then,
          email works.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="type-label self-start px-4 py-2.5 transition-opacity hover:opacity-85"
          style={{ background: 'var(--fg)', color: 'var(--bg)' }}
        >
          Email {profile.shortName}
        </a>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div
        className="flex flex-col gap-3 border p-6"
        style={{ borderColor: 'var(--accent)', background: 'var(--surface)' }}
      >
        <p className="type-label" style={{ color: 'var(--accent)' }}>
          Message sent
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          Thanks — it arrived. I'll reply to the address you gave.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="type-label self-start underline underline-offset-4 cursor-pointer"
          style={{ color: 'var(--fg)' }}
        >
          Send another
        </button>
      </div>
    );
  }

  const fieldStyle = {
    borderColor: 'var(--rule)',
    color: 'var(--fg)',
  } as const;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 border p-6"
      style={{ borderColor: 'var(--rule)', background: 'var(--surface)' }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={nameId} className="type-label" style={{ color: 'var(--fg-muted)' }}>
            {labels.name}
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full border-0 border-b bg-transparent py-2 font-mono text-sm outline-none transition-colors focus:border-b-2"
            style={fieldStyle}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={emailId} className="type-label" style={{ color: 'var(--fg-muted)' }}>
            {labels.email}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full border-0 border-b bg-transparent py-2 font-mono text-sm outline-none transition-colors focus:border-b-2"
            style={fieldStyle}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={messageId} className="type-label" style={{ color: 'var(--fg-muted)' }}>
          {labels.message}
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          required
          className="w-full resize-y border-0 border-b bg-transparent py-2 font-mono text-sm outline-none transition-colors focus:border-b-2"
          style={fieldStyle}
        />
      </div>

      {/* Honeypot: bots fill hidden fields, people don't. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {error && (
        <p role="alert" className="text-sm" style={{ color: 'var(--marker)' }}>
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="type-label" style={{ color: 'var(--fg-muted)' }}>
          Or email {profile.email}
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="type-label px-6 py-3 transition-opacity hover:opacity-85 disabled:opacity-50 cursor-pointer"
          style={{ background: 'var(--fg)', color: 'var(--bg)' }}
        >
          {status === 'sending' ? 'Sending…' : labels.submit}
        </button>
      </div>
    </form>
  );
}
