import { db } from '@/lib/db';
import { formatDate } from '@/lib/plain-text';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Subscribers',
};

type SubscribersPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default function AdminSubscribersPage({
  searchParams,
}: SubscribersPageProps) {
  return (
    <main className='flex flex-col gap-6'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>Subscribers</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Newsletter signups and subscription status.
        </p>
      </header>
      <Suspense fallback={<SubscribersFallback />}>
        <SubscriberList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function SubscriberList({ searchParams }: SubscribersPageProps) {
  const search = await searchParams;
  const pageValue = Array.isArray(search.page) ? search.page[0] : search.page;
  const requestedPage = Math.max(1, Number.parseInt(pageValue ?? '1', 10) || 1);
  const pageSize = 25;
  const totalSubscribers = await db.newsletterSubscriber.count();
  const totalPages = Math.max(1, Math.ceil(totalSubscribers / pageSize));
  const page = Math.min(requestedPage, totalPages);
  const subscribers = await db.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      id: true,
      email: true,
      status: true,
      subscribedAt: true,
      unsubscribedAt: true,
    },
  });

  if (subscribers.length === 0) {
    return (
      <p className='text-sm text-muted-foreground'>
        No newsletter subscribers yet.
      </p>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <p className='text-sm text-muted-foreground'>
          {totalSubscribers} total · Page {page} of {totalPages}
        </p>
        <a
          className='inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90'
          href='/api/admin/subscribers/export'
        >
          Export all as CSV
        </a>
      </div>
      <div className='overflow-x-auto rounded-md border border-border bg-card'>
        <table className='w-full min-w-160 text-left text-sm'>
          <thead className='border-b border-border bg-muted'>
            <tr>
              <th className='px-4 py-3 font-medium'>Email</th>
              <th className='px-4 py-3 font-medium'>Status</th>
              <th className='px-4 py-3 font-medium'>Subscribed</th>
              <th className='px-4 py-3 font-medium'>Unsubscribed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr
                className='border-b border-border last:border-0'
                key={subscriber.id}
              >
                <td className='px-4 py-3 font-medium'>{subscriber.email}</td>
                <td className='px-4 py-3'>
                  <span
                    className={
                      subscriber.status === 'ACTIVE'
                        ? 'inline-flex rounded-md bg-chart-4/15 px-2 py-1 text-xs font-medium text-foreground'
                        : 'inline-flex rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground'
                    }
                  >
                    {subscriber.status === 'ACTIVE' ? 'Active' : 'Unsubscribed'}
                  </span>
                </td>
                <td className='whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground'>
                  <time dateTime={subscriber.subscribedAt.toISOString()}>
                    {formatDate(subscriber.subscribedAt)}
                  </time>
                </td>
                <td className='whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground'>
                  {subscriber.unsubscribedAt ? (
                    <time dateTime={subscriber.unsubscribedAt.toISOString()}>
                      {formatDate(subscriber.unsubscribedAt)}
                    </time>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        aria-label='Subscriber pages'
        className='flex items-center justify-between'
      >
        {page > 1 ? (
          <Link
            className='text-sm font-medium text-primary hover:underline'
            href={`/admin/subscribers?page=${page - 1}`}
          >
            Previous
          </Link>
        ) : (
          <span />
        )}
        {page < totalPages ? (
          <Link
            className='text-sm font-medium text-primary hover:underline'
            href={`/admin/subscribers?page=${page + 1}`}
          >
            Next
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

function SubscribersFallback() {
  return (
    <div
      aria-label='Loading subscribers'
      className='overflow-hidden rounded-md border border-border bg-card'
      role='status'
    >
      <div className='h-11 border-b border-border bg-muted' />
      {Array.from({ length: 5 }, (_, index) => (
        <div
          className='flex min-h-12 items-center gap-8 border-b border-border px-4 last:border-0'
          key={index}
        >
          <div className='h-4 flex-1 animate-pulse rounded bg-muted' />
          <div className='h-4 w-24 animate-pulse rounded bg-muted' />
          <div className='h-4 w-32 animate-pulse rounded bg-muted' />
          <div className='h-4 w-32 animate-pulse rounded bg-muted' />
        </div>
      ))}
    </div>
  );
}
