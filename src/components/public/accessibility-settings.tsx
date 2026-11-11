'use client';

import { Accessibility, Minus, Plus, RotateCcw, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ColorMode = 'normal' | 'grayscale' | 'reduced';
type Preferences = {
  textScale: number;
  highContrast: boolean;
  colorMode: ColorMode;
  readableFont: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
};

const STORAGE_KEY = 'beyond-statute-accessibility';
const DEFAULT_PREFERENCES: Preferences = {
  textScale: 1,
  highContrast: false,
  colorMode: 'normal',
  readableFont: false,
  highlightLinks: false,
  reduceMotion: false,
};

function readPreferences(): Preferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(stored) as Partial<Preferences>;
    return {
      ...DEFAULT_PREFERENCES,
      ...parsed,
      textScale: [0.9, 1, 1.1, 1.2].includes(parsed.textScale ?? 1)
        ? (parsed.textScale ?? 1)
        : 1,
      colorMode: ['normal', 'grayscale', 'reduced'].includes(
        parsed.colorMode ?? 'normal'
      )
        ? (parsed.colorMode ?? 'normal')
        : 'normal',
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function applyPreferences(preferences: Preferences) {
  const site = document.querySelector<HTMLElement>('.public-site');
  if (!site) return;
  site.dataset.publicTextScale = String(preferences.textScale);
  site.toggleAttribute('data-public-high-contrast', preferences.highContrast);
  site.toggleAttribute('data-public-readable-font', preferences.readableFont);
  site.toggleAttribute(
    'data-public-highlight-links',
    preferences.highlightLinks
  );
  site.toggleAttribute('data-public-reduce-motion', preferences.reduceMotion);
  site.dataset.publicColorMode = preferences.colorMode;
}

export function AccessibilitySettings() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let saved = readPreferences();
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        saved = {
          ...saved,
          reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches,
        };
      }
    } catch {
      saved = {
        ...saved,
        reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
          .matches,
      };
    }
    setPreferences(saved);
    setHydrated(true);
    return () => {
      const site = document.querySelector<HTMLElement>('.public-site');
      if (!site) return;
      delete site.dataset.publicTextScale;
      delete site.dataset.publicColorMode;
      site.removeAttribute('data-public-high-contrast');
      site.removeAttribute('data-public-readable-font');
      site.removeAttribute('data-public-highlight-links');
      site.removeAttribute('data-public-reduce-motion');
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Preferences still apply for the current page when storage is unavailable.
    }
    applyPreferences(preferences);
  }, [hydrated, preferences]);

  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  function openDialog() {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }

  function closeDialog() {
    if (dialogRef.current?.open) dialogRef.current.close();
  }

  return (
    <>
      <button
        aria-label='Open accessibility settings'
        className='fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-md transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        onClick={openDialog}
        ref={triggerRef}
        title='Accessibility settings'
        type='button'
      >
        <Accessibility aria-hidden='true' size={22} />
      </button>

      <dialog
        aria-labelledby='accessibility-title'
        className='accessibility-dialog fixed inset-0 m-auto max-h-[min(90dvh,48rem)] w-[min(92vw,36rem)] overflow-y-auto border border-border bg-card p-0 text-card-foreground shadow-2xl'
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
        onClose={() => triggerRef.current?.focus()}
        ref={dialogRef}
      >
        <div className='flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6'>
          <div>
            <p className='font-mono text-xs uppercase tracking-wide text-primary'>
              Reading preferences
            </p>
            <h2
              className='mt-2 font-heading text-2xl text-card-foreground'
              id='accessibility-title'
            >
              Accessibility settings
            </h2>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>
              Adjust this website to suit your reading preferences.
            </p>
          </div>
          <button
            aria-label='Close accessibility settings'
            className='inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            autoFocus
            onClick={closeDialog}
            type='button'
          >
            <X aria-hidden='true' size={18} />
          </button>
        </div>

        <div className='flex flex-col gap-6 p-5 sm:p-6'>
          <section aria-labelledby='text-size-label'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <h3 className='text-sm font-semibold' id='text-size-label'>
                  Text size
                </h3>
                <p className='mt-1 text-xs text-muted-foreground'>
                  Adjust text throughout the public site.
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  aria-label='Decrease text size'
                  className='inline-flex size-9 items-center justify-center rounded-md border border-border hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50'
                  disabled={preferences.textScale <= 0.9}
                  onClick={() =>
                    update(
                      'textScale',
                      Math.max(
                        0.9,
                        Math.round((preferences.textScale - 0.1) * 10) / 10
                      )
                    )
                  }
                  type='button'
                >
                  <Minus aria-hidden='true' size={16} />
                </button>
                <span
                  aria-live='polite'
                  className='min-w-10 text-center font-mono text-xs'
                >
                  {Math.round(preferences.textScale * 100)}%
                </span>
                <button
                  aria-label='Reset text size'
                  className='inline-flex size-9 items-center justify-center rounded-md border border-border hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  onClick={() => update('textScale', 1)}
                  title='Reset text size'
                  type='button'
                >
                  <RotateCcw aria-hidden='true' size={15} />
                </button>
                <button
                  aria-label='Increase text size'
                  className='inline-flex size-9 items-center justify-center rounded-md border border-border hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50'
                  disabled={preferences.textScale >= 1.2}
                  onClick={() =>
                    update(
                      'textScale',
                      Math.min(
                        1.2,
                        Math.round((preferences.textScale + 0.1) * 10) / 10
                      )
                    )
                  }
                  type='button'
                >
                  <Plus aria-hidden='true' size={16} />
                </button>
              </div>
            </div>
          </section>

          <fieldset className='flex flex-col gap-3 border-t border-border pt-5'>
            <legend className='mb-3 text-sm font-semibold'>
              Color and contrast
            </legend>
            <PreferenceToggle
              checked={preferences.highContrast}
              label='High contrast'
              onChange={(value) => update('highContrast', value)}
            />
            <PreferenceToggle
              checked={preferences.highlightLinks}
              label='Highlight links'
              onChange={(value) => update('highlightLinks', value)}
            />
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Color adjustment</span>
              <div
                aria-label='Color adjustment'
                className='flex flex-wrap gap-2'
                role='group'
              >
                {(['normal', 'grayscale', 'reduced'] as const).map((mode) => (
                  <button
                    aria-pressed={preferences.colorMode === mode}
                    className={`min-h-9 rounded-md border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${preferences.colorMode === mode ? 'border-primary bg-accent text-accent-foreground' : 'border-border hover:bg-muted'}`}
                    key={mode}
                    onClick={() => update('colorMode', mode)}
                    type='button'
                  >
                    {mode === 'normal'
                      ? 'Normal'
                      : mode === 'grayscale'
                        ? 'Grayscale'
                        : 'Reduced color'}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset className='flex flex-col gap-3 border-t border-border pt-5'>
            <legend className='mb-3 text-sm font-semibold'>
              Reading and motion
            </legend>
            <PreferenceToggle
              checked={preferences.readableFont}
              label='Use a simple, readable font'
              onChange={(value) => update('readableFont', value)}
            />
            <PreferenceToggle
              checked={preferences.reduceMotion}
              label='Reduce animation and motion'
              onChange={(value) => update('reduceMotion', value)}
            />
            <p className='text-xs leading-5 text-muted-foreground'>
              Reduced motion is also respected when enabled in your device
              settings.
            </p>
          </fieldset>

          <div className='flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5'>
            <button
              className='text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              onClick={() =>
                setPreferences({
                  ...DEFAULT_PREFERENCES,
                  reduceMotion: window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                  ).matches,
                })
              }
              type='button'
            >
              Reset all settings
            </button>
            <button
              className='inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              onClick={closeDialog}
              type='button'
            >
              Done
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

function PreferenceToggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className='flex min-h-10 cursor-pointer items-center justify-between gap-4 text-sm'>
      <span>{label}</span>
      <input
        checked={checked}
        className='size-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        onChange={(event) => onChange(event.target.checked)}
        type='checkbox'
      />
    </label>
  );
}
