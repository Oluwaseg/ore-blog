'use client';

import { AdminNav } from '@/components/admin/admin-nav';
import { useAdminSidebarStore } from '@/features/admin/sidebar-store';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function AdminSidebar() {
  const collapsed = useAdminSidebarStore((state) => state.collapsed);
  const toggleCollapsed = useAdminSidebarStore(
    (state) => state.toggleCollapsed
  );

  return (
    <aside
      className={`hidden shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-out md:sticky md:top-0 md:flex md:h-screen md:flex-col ${
        collapsed ? 'md:w-18' : 'md:w-64'
      }`}
      data-collapsed={collapsed}
    >
      <div
        className={`flex items-center justify-between gap-2 border-b border-sidebar-border px-5 py-5 ${
          collapsed ? 'md:flex-col md:gap-3 md:px-0' : ''
        }`}
      >
        <Link
          className='flex min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring'
          href='/admin'
        >
          <Image
            alt='Beyond the Statute'
            className='h-8 w-11 shrink-0 object-contain'
            height={1024}
            src='/logo.png'
            width={1536}
          />
          <span className={`min-w-0 ${collapsed ? 'md:hidden' : ''}`}>
            <span className='block truncate font-heading text-base font-semibold leading-tight tracking-tight'>
              Beyond the Statute
            </span>
            <span className='block font-mono text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/60'>
              Editorial desk
            </span>
          </span>
        </Link>

        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className='hidden size-8 shrink-0 items-center justify-center text-sidebar-foreground/60 transition-colors hover:text-sidebar-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring md:inline-flex'
          onClick={toggleCollapsed}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          type='button'
        >
          {collapsed ? (
            <PanelLeftOpen size={16} />
          ) : (
            <PanelLeftClose size={16} />
          )}
        </button>
      </div>

      <div className='flex-1 overflow-y-auto py-6'>
        <p
          className={`mb-3 px-5 font-mono text-[10px] uppercase tracking-[0.22em] text-sidebar-foreground/50 ${
            collapsed ? 'md:invisible' : ''
          }`}
        >
          Sections
        </p>
        <AdminNav collapsed={collapsed} />
      </div>

      <p
        className={`border-t border-sidebar-border px-5 py-4 font-heading text-sm italic text-sidebar-foreground/60 ${
          collapsed ? 'md:hidden' : ''
        }`}
      >
        Where the law ends, the story begins.
      </p>
    </aside>
  );
}
