'use client';

import {
  BookOpen,
  FileText,
  Flag,
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
  { href: '/admin/reports', label: 'Reports', icon: Flag },
  { href: '/admin/stories', label: 'Story submissions', icon: BookOpen },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

type AdminNavProps = {
  collapsed?: boolean;
  variant?: 'rail' | 'drawer';
};

export function AdminNav({
  collapsed = false,
  variant = 'rail',
}: AdminNavProps) {
  const pathname = usePathname();
  const isDrawer = variant === 'drawer';
  const isIconRail = collapsed && !isDrawer;

  return (
    <nav
      aria-label='Admin sections'
      className='flex flex-col gap-0.5 px-2 md:px-0'
    >
      {links.map((link, index) => {
        const isActive =
          link.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(link.href);

        return (
          <Link
            aria-current={isActive ? 'page' : undefined}
            aria-label={isIconRail ? link.label : undefined}
            className={`group relative flex items-center gap-3 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sidebar-ring
              ${
                isDrawer
                  ? 'min-h-12 px-4 text-[15px]'
                  : `px-3 py-2.5 text-sm md:px-5 ${isIconRail ? 'md:justify-center md:px-0' : ''}`
              }
              ${
                isActive
                  ? isDrawer
                    ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                    : 'font-medium text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
              }`}
            href={link.href}
            key={link.href}
            title={isIconRail ? link.label : undefined}
          >
            <span
              aria-hidden='true'
              className={`absolute inset-y-1.5 left-0 w-0.5 bg-sidebar-primary transition-transform duration-300 ${
                isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'
              } ${isDrawer ? '' : 'hidden md:block'}`}
            />
            <span
              aria-hidden='true'
              className={`w-5 font-mono text-[10px] tabular-nums text-sidebar-foreground/40 ${
                isIconRail ? 'hidden' : ''
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <link.icon
              aria-hidden='true'
              className='shrink-0'
              size={isDrawer ? 18 : 16}
            />
            <span className={isIconRail ? 'md:hidden' : undefined}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
