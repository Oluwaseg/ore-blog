'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteNav() {
  return (
    <Suspense fallback={<NavLinks activePath={null} />}>
      <ActiveSiteNav />
    </Suspense>
  );
}

function ActiveSiteNav() {
  return <NavLinks activePath={usePathname()} />;
}

function NavLinks({ activePath }: { activePath: string | null }) {
  return (
    <nav aria-label='Main navigation' className='flex flex-wrap gap-1 text-sm'>
      {links.map((link) => {
        const isActive = activePath === link.href;

        return (
          <Link
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-md px-3 py-2 transition-colors ${isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
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
