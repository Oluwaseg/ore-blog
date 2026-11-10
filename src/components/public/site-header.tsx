import { MobileNav } from '@/components/public/mobile-nav';
import { SearchForm } from '@/components/public/search-form';
import { SiteNav } from '@/components/public/site-nav';
import { ThemeToggle } from '@/components/public/theme-toggle';
import { getPublicationSettings } from '@/lib/publication';
import Link from 'next/link';

function todayLine() {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

export async function SiteHeader() {
  const publication = await getPublicationSettings();
  const date = todayLine();

  const brand = (
    <Link
      aria-label={publication.name}
      className='group inline-flex items-center gap-3 text-foreground'
      href='/'
    >
      {publication.logoUrl ? (
        <img
          alt=''
          className='max-h-16 max-w-48 object-contain md:max-h-12 md:max-w-36'
          src={publication.logoUrl}
        />
      ) : null}
      <span className='font-heading text-[1.75rem] leading-none tracking-[-0.02em] md:text-[3.25rem] lg:text-[3.75rem]'>
        {publication.name}
        <span className='text-primary transition-colors group-hover:text-accent-foreground'>
          .
        </span>
      </span>
    </Link>
  );

  return (
    <header className='masthead relative border-b border-foreground/80 bg-background'>
      {/* ---------- Desktop ---------- */}
      <div className='mx-auto hidden w-full max-w-6xl px-6 sm:px-8 md:block lg:px-10'>
        {/* Utility rail */}
        <div className='flex items-center justify-between border-b border-border py-2.5 text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground'>
          <span>{date}</span>
          <span className='hidden font-heading text-[0.8125rem] normal-case italic tracking-normal lg:inline'>
            Essays, notes &amp; dispatches
          </span>
          <ThemeToggle />
        </div>

        {/* Asymmetric masthead: brand left (wide), index right (narrow) */}
        <div className='grid grid-cols-12 items-end gap-x-8 pb-5 pt-7'>
          <div className='col-span-7 lg:col-span-6'>
            <p className='mb-3 flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.22em] text-primary'>
              <span className='h-px w-8 bg-primary' aria-hidden />
              The Journal
            </p>
            {brand}
          </div>

          <div className='col-span-5 border-l border-border pl-8 lg:col-span-6'>
            <SiteNav />
            <div className='mt-5 border-t border-dashed border-border pt-4'>
              <SearchForm variant='rule' inputId='site-search-desktop' />
            </div>
          </div>
        </div>
      </div>
      {/* Double rule — a classic newspaper finish */}
      <div
        className='hidden h-[3px] border-b border-border md:block'
        aria-hidden
      />

      {/* ---------- Mobile ---------- */}
      <div className='flex items-center justify-between px-5 py-3.5 md:hidden'>
        {brand}
        <MobileNav date={date} name={publication.name} />
      </div>
    </header>
  );
}
