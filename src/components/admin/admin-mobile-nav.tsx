'use client';

import { AdminNav } from '@/components/admin/admin-nav';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const PANEL_ID = 'admin-mobile-menu';

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const prevPathname = useRef(usePathname());
  const pathname = usePathname();

  const close = () => {
    setShown(false);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 280);
  };

  // paint the closed state first, then slide in
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // close when the route changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // stop being a drawer once there's room for the rail
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // lock the page behind it, Escape closes, Tab stays inside
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const focusFrame = window.setTimeout(() => panelRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusFrame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    []
  );

  return (
    <div className='md:hidden'>
      <button
        aria-controls={PANEL_ID}
        aria-expanded={open}
        className='inline-flex min-h-10 shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        onClick={() => setOpen(true)}
        type='button'
      >
        <Menu aria-hidden='true' size={16} />
        Menu
      </button>

      {open &&
        createPortal(
          <div className='fixed inset-0 z-100'>
            <div
              aria-hidden='true'
              className={`admin-scrim absolute inset-0 transition-opacity duration-300 ${
                shown ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={close}
            />

            <div
              aria-label='Admin sections'
              aria-modal='true'
              className={`absolute inset-y-0 left-0 flex w-[86%] max-w-80 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-2xl transition-transform duration-300 ease-out focus:outline-none ${
                shown ? 'translate-x-0' : '-translate-x-full'
              }`}
              id={PANEL_ID}
              ref={panelRef}
              role='dialog'
              tabIndex={-1}
            >
              <div className='flex items-center justify-between gap-3 border-b border-sidebar-border px-4 py-4'>
                <Link
                  className='flex min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring'
                  href='/admin'
                  onClick={close}
                >
                  <Image
                    alt='Beyond the Statute'
                    className='h-8 w-11 shrink-0 object-contain'
                    height={1024}
                    src='/logo.png'
                    width={1536}
                  />
                  <span className='min-w-0'>
                    <span className='block truncate font-heading text-base font-semibold leading-tight tracking-tight'>
                      Beyond the Statute
                    </span>
                    <span className='block font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/60'>
                      Editorial desk
                    </span>
                  </span>
                </Link>

                <button
                  aria-label='Close menu'
                  className='inline-flex size-9 shrink-0 items-center justify-center text-sidebar-foreground/60 transition-colors hover:text-sidebar-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring'
                  onClick={close}
                  type='button'
                >
                  <X aria-hidden='true' size={18} />
                </button>
              </div>

              <div className='flex-1 overflow-y-auto py-4'>
                <p className='mb-3 px-5 font-mono text-[10px] uppercase tracking-[0.22em] text-sidebar-foreground/50'>
                  Sections
                </p>
                <AdminNav variant='drawer' />
              </div>

              <p className='border-t border-sidebar-border px-5 py-4 font-heading text-sm italic text-sidebar-foreground/60'>
                Where the law ends, the story begins.
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
