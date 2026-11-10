import { SearchForm } from '@/components/public/search-form';
import { SiteNav } from '@/components/public/site-nav';
import { publication } from '@/lib/publication';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className='border-b border-border bg-background'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10'>
        <div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-8'>
          <Link className='font-heading text-xl text-foreground' href='/'>
            {publication.name}
          </Link>
          <SiteNav />
        </div>
        <SearchForm />
      </div>
    </header>
  );
}
