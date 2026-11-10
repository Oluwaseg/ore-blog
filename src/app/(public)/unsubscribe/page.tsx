import { unsubscribeNewsletterAction } from '@/actions/engagement';
import { verifyUnsubscribeToken } from '@/features/newsletter/unsubscribe-token';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Unsubscribe',
  robots: { index: false, follow: false },
};

type UnsubscribePageProps = {
  searchParams: Promise<{ token?: string; status?: string }>;
};

export default function UnsubscribePage({
  searchParams,
}: UnsubscribePageProps) {
  return (
    <main className='mx-auto flex w-full max-w-3xl flex-1 items-start px-6 py-12 sm:px-8 sm:py-16'>
      <Suspense fallback={<UnsubscribeFallback />}>
        <UnsubscribeContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function UnsubscribeContent({ searchParams }: UnsubscribePageProps) {
  const { token, status } = await searchParams;

  if (status === 'success') {
    return (
      <section className='w-full border-l-2 border-primary/40 pl-6'>
        <p className='font-mono text-xs uppercase text-muted-foreground'>
          Newsletter
        </p>
        <h1 className='mt-3 font-heading text-3xl text-foreground'>
          You’re unsubscribed.
        </h1>
        <p className='mt-3 text-sm leading-6 text-muted-foreground'>
          You won’t receive future newsletter emails at this address.
        </p>
        <Link
          className='mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline'
          href='/'
        >
          Return to the publication
        </Link>
      </section>
    );
  }

  if (
    status === 'invalid' ||
    !token ||
    !(await verifyUnsubscribeToken(token))
  ) {
    return (
      <section className='w-full border-l-2 border-destructive/50 pl-6'>
        <p className='font-mono text-xs uppercase text-muted-foreground'>
          Newsletter
        </p>
        <h1 className='mt-3 font-heading text-3xl text-foreground'>
          This unsubscribe link is invalid.
        </h1>
        <p className='mt-3 text-sm leading-6 text-muted-foreground'>
          The link may be incomplete. Use the unsubscribe link from a recent
          newsletter email.
        </p>
        <Link
          className='mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline'
          href='/'
        >
          Return to the publication
        </Link>
      </section>
    );
  }

  return (
    <section className='w-full max-w-xl border-l-2 border-primary/40 pl-6'>
      <p className='font-mono text-xs uppercase text-muted-foreground'>
        Newsletter
      </p>
      <h1 className='mt-3 font-heading text-3xl text-foreground'>
        Unsubscribe from email updates?
      </h1>
      <p className='mt-3 text-sm leading-6 text-muted-foreground'>
        Confirm below to stop receiving newsletter emails. This won’t affect
        your access to published articles.
      </p>
      <form action={unsubscribeNewsletterAction} className='mt-6'>
        <input name='token' type='hidden' value={token} />
        <button
          className='inline-flex min-h-11 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground'
          type='submit'
        >
          Confirm unsubscribe
        </button>
      </form>
    </section>
  );
}

function UnsubscribeFallback() {
  return (
    <div
      aria-label='Loading unsubscribe options'
      className='w-full max-w-xl space-y-4'
      role='status'
    >
      <div className='h-4 w-24 animate-pulse rounded bg-muted' />
      <div className='h-9 w-3/4 animate-pulse rounded bg-muted' />
      <div className='h-5 w-full animate-pulse rounded bg-muted' />
    </div>
  );
}
