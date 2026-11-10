import { SearchForm } from '@/components/public/search-form';
import { SiteNav } from '@/components/public/site-nav';
import { getPublicationSettings } from '@/lib/publication';
import Link from 'next/link';

export async function SiteHeader() {
  const publication = await getPublicationSettings();

  return (
    <header className='border-b border-border bg-background'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10'>
        <div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-8'>
          <Link
            aria-label={publication.name}
            className='flex min-h-10 items-center text-foreground'
            href='/'
          >
            <span className='flex items-center gap-3'>
              {publication.logoUrl ? (
                <img
                  alt={publication.name}
                  className='max-h-12 max-w-36 object-contain'
                  src={publication.logoUrl}
                />
              ) : null}
              <span className='font-heading text-xl'>{publication.name}</span>
            </span>
          </Link>
          <SiteNav />
        </div>
        <SearchForm />
      </div>
    </header>
  );
}
