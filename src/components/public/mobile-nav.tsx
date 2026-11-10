'use client';

import { SearchForm } from '@/components/public/search-form';
import { isActivePath, links, pad } from '@/components/public/site-links';
import { ThemeToggle } from '@/components/public/theme-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function MobileNav({ date, name }: { date: string; name: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        aria-controls='mobile-index'
        aria-expanded={open}
        className='inline-flex h-10 items-center gap-2.5 border-l border-border pl-4 text-[0.6875rem] uppercase tracking-[0.22em] text-foreground'
        onClick={() => setOpen(true)}
        type='button'
      >
        Index
        <span aria-hidden className='flex flex-col gap-[5px]'>
          <span className='block h-px w-5 bg-foreground' />
          <span className='block h-px w-3.5 self-end bg-primary' />
        </span>
      </button>

      {open ? (
        <div
          aria-label='Site index'
          aria-modal='true'
          className='mobile-index fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background'
          id='mobile-index'
          role='dialog'
        >
          {/* Top bar */}
          <div className='flex items-center justify-between border-b border-foreground/80 px-5 py-3.5'>
            <span className='font-heading text-[1.75rem] leading-none tracking-[-0.02em]'>
              {name}
              <span className='text-primary'>.</span>
            </span>
            <button
              className='inline-flex h-10 items-center gap-2 border-l border-border pl-4 text-[0.6875rem] uppercase tracking-[0.22em]'
              onClick={() => setOpen(false)}
              type='button'
            >
              Close{' '}
              <span
                aria-hidden
                className='font-heading text-xl leading-none normal-case'
              >
                ×
              </span>
            </button>
          </div>

          <div className='flex items-center justify-between px-5 pt-5 text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground'>
            <span>{date}</span>
            <span className='font-heading text-sm normal-case italic tracking-normal text-primary'>
              Contents
            </span>
          </div>

          {/* Oversized numbered index */}
          <nav aria-label='Main navigation' className='flex-1 px-5 pt-4'>
            <ol>
              {links.map((link, i) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li
                    className='mobile-index-item border-b border-border'
                    key={link.href}
                    style={{ animationDelay: `${80 + i * 70}ms` }}
                  >
                    <Link
                      aria-current={active ? 'page' : undefined}
                      className='group flex items-baseline gap-4 py-3.5'
                      href={link.href}
                      onClick={() => setOpen(false)}
                    >
                      <span className='w-6 shrink-0 text-xs tabular-nums tracking-wider text-muted-foreground'>
                        {pad(i)}
                      </span>
                      <span
                        className={`font-heading text-[2.75rem] leading-[1] tracking-[-0.025em] transition-colors ${
                          active
                            ? 'italic text-primary'
                            : 'text-foreground group-active:text-primary'
                        }`}
                      >
                        {link.label}
                      </span>
                      {active ? (
                        <span className='ml-auto self-center text-[0.625rem] uppercase tracking-[0.2em] text-accent-foreground'>
                          You are here
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Footer: search + theme, set like a colophon */}
          <div
            className='mobile-index-item mt-8 border-t border-foreground/80 bg-muted px-5 pb-8 pt-5'
            style={{ animationDelay: `${80 + links.length * 70}ms` }}
          >
            <p className='mb-3 text-[0.6875rem] uppercase tracking-[0.22em] text-muted-foreground'>
              Search the archive
            </p>
            <SearchForm variant='rule' inputId='site-search-mobile' />
            <div className='mt-6 flex items-center justify-between border-t border-border pt-4'>
              <span className='font-heading text-sm italic text-muted-foreground'>
                Reading light
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
