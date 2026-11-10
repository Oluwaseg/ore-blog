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

export default function ContactPage() {
  return (
    <article className='mx-auto w-full max-w-4xl space-y-10 pb-12'>
      <header className='border-b border-border pb-8'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          Contact
        </p>
        <h1 className='mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          A conversation can be a beginning.
        </h1>
        <p className='mt-5 max-w-2xl text-base leading-7 text-muted-foreground'>
          Reach out with a question, partnership idea, media enquiry, or
          contribution proposal. We’ll respond by email.
        </p>
        <div className='mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm'>
          <a
            className='text-primary underline-offset-4 hover:underline'
            href='mailto:beyondthestatutee@gmail.com'
          >
            beyondthestatutee@gmail.com
          </a>
          <Suspense fallback={null}>
            <InstagramContact />
          </Suspense>
        </div>
      </header>
      <section className='max-w-2xl'>
        <h2 className='mb-5 font-heading text-2xl'>Send an enquiry</h2>
        <ContactForm />
      </section>
    </article>
  );
}

async function InstagramContact() {
  const settings = await getPublicationSettings();
  if (!settings.instagramUrl) return null;

  return (
    <Link
      className='text-primary underline-offset-4 hover:underline'
      href={settings.instagramUrl}
      target='_blank'
      rel='noreferrer'
    >
      Instagram
    </Link>
  );
}
