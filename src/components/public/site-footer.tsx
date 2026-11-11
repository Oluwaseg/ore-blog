import { NewsletterForm } from '@/components/public/newsletter-form';
import { links, pad } from '@/components/public/site-links';
import { getPublicationSettings } from '@/lib/publication';
import Link from 'next/link';

export async function SiteFooter() {
  const publication = await getPublicationSettings();
  const year = new Date().getFullYear();

  return (
    <footer className='mt-16 bg-card text-card-foreground'>
      {/* Double rule mirrors the masthead */}
      <div
        aria-hidden
        className='h-0.75 border-t border-b border-t-foreground/80 border-b-border'
      />

      <div className='mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10'>
        {/* Newsletter: the lead story of the footer */}
        <section className='grid gap-8 border-b border-border py-12 md:grid-cols-12 md:gap-10 md:py-16'>
          <div className='md:col-span-7'>
            <p className='mb-4 flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.22em] text-primary'>
              <span aria-hidden className='h-px w-8 bg-primary' />
              The Letter
            </p>
            <h2 className='font-heading text-[2.25rem] leading-[1.05] tracking-[-0.02em] md:text-[3.25rem]'>
              New writing, delivered <em className='text-primary'>quietly</em>{' '}
              to your inbox.
            </h2>
          </div>
          <div className='md:col-span-5 md:self-end md:border-l md:border-border md:pl-10'>
            <p className='mb-5 text-sm leading-6 text-muted-foreground'>
              Get new articles by email. Every welcome email includes an
              unsubscribe link.
            </p>
            <NewsletterForm />
          </div>
        </section>

        {/* Colophon grid */}
        <section className='grid gap-10 py-10 md:grid-cols-12'>
          <div className='md:col-span-6'>
            <Link
              aria-label={publication.name}
              className='group inline-flex items-center gap-3'
              href='/'
            >
              {publication.logoUrl ? (
                <img
                  alt=''
                  className='max-h-16 max-w-48 object-contain'
                  src={publication.logoUrl}
                />
              ) : null}
              <span className='font-heading text-3xl leading-none tracking-[-0.02em]'>
                {publication.name}
                <span className='text-primary transition-colors group-hover:text-accent-foreground'>
                  .
                </span>
              </span>
            </Link>
            {publication.description ? (
              <p className='mt-4 max-w-md font-heading text-lg italic leading-7 text-muted-foreground'>
                {publication.description}
              </p>
            ) : null}
            <div className='mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm'>
              <a
                className='text-primary underline-offset-4 hover:underline'
                href='mailto:beyondthestatutee@gmail.com'
              >
                Email Beyond the Statute
              </a>
              {publication.instagramUrl ? (
                <Link
                  className='text-primary underline-offset-4 hover:underline'
                  href={publication.instagramUrl}
                  target='_blank'
                  rel='noreferrer'
                >
                  Instagram
                </Link>
              ) : null}
              <Link
                className='text-primary underline-offset-4 hover:underline'
                href='/stories/submit'
              >
                Share your story
              </Link>
            </div>
          </div>

          <nav
            aria-label='Footer navigation'
            className='md:col-span-6 md:border-l md:border-border md:pl-10'
          >
            <p className='mb-3 text-[0.6875rem] uppercase tracking-[0.22em] text-muted-foreground'>
              Index
            </p>
            <ul className='grid grid-cols-2 gap-x-6 sm:grid-cols-3'>
              {links.map((link, i) => (
                <li className='border-b border-border' key={link.href}>
                  <Link
                    className='group flex items-baseline gap-2 py-2.5 font-heading text-lg transition-colors hover:text-primary'
                    href={link.href}
                  >
                    <span className='font-sans text-[0.625rem] tabular-nums tracking-wider text-muted-foreground'>
                      {pad(i)}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* Imprint line */}
        <div className='flex flex-col gap-2 border-t border-foreground/80 py-5 text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
          <span>
            © {year} {publication.name}
          </span>
          <span className='font-heading text-sm normal-case italic tracking-normal'>
            Research, rights, and the realities between them.
          </span>
        </div>
      </div>
    </footer>
  );
}
