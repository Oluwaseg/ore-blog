'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { isActivePath, links, pad } from '@/components/public/site-links';

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

/** Desktop editorial index: numbered, serif, hairline-separated. */
function NavLinks({ activePath }: { activePath: string | null }) {
  return (
    <nav aria-label='Main navigation'>
      <p className='mb-2 text-[0.6875rem] uppercase tracking-[0.22em] text-muted-foreground'>
        Index
      </p>
      <ul className='flex flex-wrap items-baseline gap-x-5 gap-y-2 lg:gap-x-7'>
        {links.map((link, i) => {
          const active = isActivePath(activePath, link.href);
          return (
            <li key={link.href}>
              <Link
                aria-current={active ? 'page' : undefined}
                className={`group relative inline-flex items-baseline gap-1.5 py-1 font-heading text-lg leading-none transition-colors lg:text-xl ${
                  active
                    ? 'italic text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
                href={link.href}
              >
                <sup className='font-sans text-[0.625rem] not-italic tabular-nums tracking-wider text-muted-foreground'>
                  {pad(i)}
                </sup>
                {link.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-5 right-0 h-px origin-left bg-primary transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
