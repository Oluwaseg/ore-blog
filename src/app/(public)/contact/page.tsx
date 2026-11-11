import { ContactForm } from '@/components/public/contact-form';
import { getPublicationSettings } from '@/lib/publication';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Beyond the Statute for general, partnership, media, or contribution enquiries.',
};

const reasons = [
  { label: 'General', note: 'Questions, corrections, and kind words.' },
  { label: 'Partnerships', note: 'Organisations working on shared causes.' },
  { label: 'Media', note: 'Interviews, quotes, and press enquiries.' },
  { label: 'Contribute', note: 'Pitches, essays, and reporting ideas.' },
];

export default function ContactPage() {
  return (
    <article className='relative pb-16'>
      {/* Oversized watermark word */}
      <p
        aria-hidden
        className='pointer-events-none absolute -top-6 right-0 select-none font-heading text-[9rem] italic leading-none text-primary/[0.06] sm:text-[14rem] lg:text-[18rem]'
      >
        Write
      </p>

      <header className='relative grid gap-8 border-b border-foreground/80 pb-10 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <p className='flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-primary'>
            <span aria-hidden className='h-px w-8 bg-primary' />
            Correspondence
          </p>
          <h1 className='mt-5 font-heading text-5xl leading-[1] tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl'>
            A conversation can be a <em className='text-primary'>beginning</em>.
          </h1>
        </div>
        <p className='self-end text-base leading-7 text-muted-foreground lg:col-span-4 lg:border-l lg:border-border lg:pl-6'>
          Reach out with a question, partnership idea, media enquiry, or
          contribution proposal. We’ll respond by email.
        </p>
      </header>

      <div className='relative mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16'>
        {/* Left: directory */}
        <aside className='space-y-12 lg:col-span-5 lg:sticky lg:top-28 lg:self-start'>
          <section aria-labelledby='write-direct'>
            <h2
              className='text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted-foreground'
              id='write-direct'
            >
              Write directly
            </h2>
            <a
              className='group mt-4 block break-all font-heading text-2xl text-foreground transition-colors hover:text-primary sm:text-3xl'
              href='mailto:beyondthestatutee@gmail.com'
            >
              beyondthestatutee
              <span className='text-primary'>@</span>gmail.com
              <span
                aria-hidden
                className='ml-2 inline-block transition-transform group-hover:translate-x-1'
              >
                →
              </span>
            </a>
            <Suspense fallback={null}>
              <InstagramContact />
            </Suspense>
          </section>

          <section aria-labelledby='reasons'>
            <h2
              className='text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted-foreground'
              id='reasons'
            >
              What we hear about
            </h2>
            <ol className='mt-4 divide-y divide-border border-y border-border'>
              {reasons.map((reason, i) => (
                <li className='flex gap-5 py-4' key={reason.label}>
                  <span className='w-6 shrink-0 font-heading text-sm italic text-primary'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className='font-heading text-lg text-foreground'>
                      {reason.label}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {reason.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <p className='border-l-2 border-primary pl-4 font-heading text-lg italic leading-7 text-muted-foreground'>
            Have a personal story to tell?{' '}
            <Link
              className='text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary'
              href='/submit-story'
            >
              Share it privately
            </Link>
            .
          </p>
        </aside>

        {/* Right: the letter */}
        <section
          aria-labelledby='send-enquiry'
          className='relative lg:col-span-7'
        >
          <div
            aria-hidden
            className='absolute inset-0 translate-x-3 translate-y-3 rounded-sm bg-accent'
          />
          <div className='relative rounded-sm border border-border bg-card p-6 shadow-sm sm:p-10'>
            <div className='flex items-start justify-between gap-4 border-b border-dashed border-border pb-6'>
              <div>
                <p className='text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground'>
                  To the editors
                </p>
                <h2
                  className='mt-2 font-heading text-3xl italic text-foreground'
                  id='send-enquiry'
                >
                  Dear Beyond the Statute,
                </h2>
              </div>
              <span
                aria-hidden
                className='grid size-14 shrink-0 rotate-6 place-items-center rounded-full border-2 border-dashed border-primary/50 font-heading text-[0.6rem] uppercase leading-tight tracking-widest text-primary'
              >
                Reply
                <br />
                by mail
              </span>
            </div>
            <div className='pt-8'>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

async function InstagramContact() {
  const settings = await getPublicationSettings();
  if (!settings.instagramUrl) return null;

  return (
    <Link
      className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      href={settings.instagramUrl}
      rel='noreferrer'
      target='_blank'
    >
      <span aria-hidden className='h-px w-6 bg-current' />
      Or find us on Instagram
    </Link>
  );
}
