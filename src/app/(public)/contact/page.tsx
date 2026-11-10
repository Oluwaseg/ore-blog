import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information for the publication.',
};

export default function ContactPage() {
  return (
    <article className='mx-auto w-full max-w-3xl pb-12'>
      <header className='border-b border-border pb-8'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          Contact
        </p>
        <h1 className='mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          Start a conversation.
        </h1>
        <p className='mt-5 max-w-2xl text-base leading-7 text-muted-foreground'>
          Contact details are being finalized with the publication owner. We’ll
          add the confirmed address and message channel here once they’re
          available.
        </p>
      </header>
      <p className='mt-8 text-sm leading-6 text-muted-foreground'>
        In the meantime, you can{' '}
        <Link
          className='text-primary underline-offset-4 hover:underline'
          href='/articles'
        >
          explore the published articles
        </Link>
        .
      </p>
    </article>
  );
}
