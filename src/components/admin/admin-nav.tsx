'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/subscribers', label: 'Subscribers' },
  { href: '/admin/comments', label: 'Comments' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/settings', label: 'Settings' },
];

export function AdminNav() {
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
            className={
              isActive
                ? 'rounded-md bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground'
                : 'rounded-md px-3 py-2 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
