'use client';

import { useEffect, useState } from 'react';

/**
 * Typographic Day / Night switch. Toggles the `.dark` class your theme already uses.
 * If you use next-themes, replace the internals with useTheme().setTheme().
 */
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(
    () => setDark(document.documentElement.classList.contains('dark')),
    []
  );

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
    setDark(next);
  };

  return (
    <button
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className='inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground'
      onClick={toggle}
      type='button'
    >
      <span className={dark === false ? 'text-foreground' : ''}>Day</span>
      <span aria-hidden className='relative inline-block h-px w-6 bg-border'>
        <span
          className={`absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-primary transition-[left] duration-300 ${dark ? 'left-[17px]' : 'left-0'}`}
        />
      </span>
      <span className={dark ? 'text-foreground' : ''}>Night</span>
    </button>
  );
}
