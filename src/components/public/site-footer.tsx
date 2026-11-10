import { NewsletterForm } from '@/components/public/newsletter-form';
import { getPublicationSettings } from '@/lib/publication';
import Link from 'next/link';

export async function SiteFooter() {
  const publication = await getPublicationSettings();

  return (
    <footer className='border-t border-border bg-card'>
      <div className='mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 sm:px-8 md:grid-cols-[1.2fr_1fr] lg:px-10'>
        <div>
          {publication.logoUrl ? (
            <img
              alt={publication.name}
              className='max-h-12 max-w-48 object-contain'
              src={publication.logoUrl}
            />
          ) : null}
          <p className='mt-2 font-heading text-lg text-card-foreground'>
            {publication.name}
          </p>
          <p className='mt-2 max-w-md text-sm leading-6 text-muted-foreground'>
            {publication.description}
          </p>
        </div>
        <div>
          <p className='text-sm font-semibold text-card-foreground'>
            Newsletter
          </p>
          <p className='mb-4 mt-2 text-sm text-muted-foreground'>
            Get new articles by email. Every welcome email includes an
            unsubscribe link.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className='mx-auto flex w-full max-w-6xl flex-wrap gap-4 px-6 pb-8 text-sm text-muted-foreground sm:px-8 lg:px-10'>
        <Link className='transition-colors hover:text-foreground' href='/about'>
          About
        </Link>
        <Link
          className='transition-colors hover:text-foreground'
          href='/contact'
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}
