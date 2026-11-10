'use client';

import { SearchForm } from '@/components/public/search-form';
import { publication } from '@/lib/publication';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className='border-b border-border bg-background'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10'>
        <div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-8'>
          <Link className='font-heading text-xl text-foreground' href='/'>
            {publication.name}
          </Link>
          <nav
            aria-label='Main navigation'
            className='flex flex-wrap gap-1 text-sm'
          >
            {links.map((link) => (
              <Link
                aria-current={pathname === link.href ? 'page' : undefined}
                className={`rounded-md px-3 py-2 transition-colors ${pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <SearchForm />
      </div>
    </header>
  );
}
