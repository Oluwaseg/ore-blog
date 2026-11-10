'use client';

import { AdminNav } from '@/components/admin/admin-nav';
import { useAdminSidebarStore } from '@/features/admin/sidebar-store';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export function AdminSidebar() {
  const collapsed = useAdminSidebarStore((state) => state.collapsed);
  const toggleCollapsed = useAdminSidebarStore(
    (state) => state.toggleCollapsed
  );

  return (
    <aside
      className={`shrink-0 border-b border-sidebar-border bg-sidebar px-3 py-4 text-sidebar-foreground transition-[width] md:border-b-0 md:border-r ${collapsed ? 'md:w-18' : 'md:w-60'}`}
      data-collapsed={collapsed}
    >
      <div className='mb-4 flex min-h-9 items-center justify-between gap-2 px-2'>
        <p className='truncate text-sm font-semibold'>
          <span className='md:hidden'>Editorial dashboard</span>
          <span className='hidden md:inline'>
            {collapsed ? 'ED' : 'Editorial dashboard'}
          </span>
        </p>
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className='hidden size-8 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:inline-flex'
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
      <AdminNav collapsed={collapsed} />
    </aside>
  );
}
