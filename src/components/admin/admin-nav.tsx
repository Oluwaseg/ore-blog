'use client';

import {
  FileText,
  FolderOpen,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/categories', label: 'Categories', icon: FolderOpen },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Mail },
  { href: '/admin/comments', label: 'Comments', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className='flex flex-wrap gap-1 md:flex-col'>
      {links.map((link) => {
        const isActive =
          link.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(link.href);

        return (
          <Link
            aria-current={isActive ? 'page' : undefined}
            aria-label={collapsed ? link.label : undefined}
            className={
              isActive
                ? `flex items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground ${collapsed ? 'md:justify-center md:px-0' : ''}`
                : `flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${collapsed ? 'md:justify-center md:px-0' : ''}`
            }
            href={link.href}
            key={link.href}
            title={collapsed ? link.label : undefined}
          >
            <link.icon aria-hidden='true' size={16} />
            <span className={collapsed ? 'md:hidden' : undefined}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
