import { AnalyticsCharts } from '@/components/admin/analytics-charts';
import { AnalyticsRangeControls } from '@/components/admin/analytics-range-controls';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { getAnalyticsData } from '@/features/admin/analytics';
import { getDashboardStats } from '@/features/admin/dashboard';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
};

type DashboardPageProps = {
  searchParams: Promise<{
    days?: string | string[];
    from?: string | string[];
    to?: string | string[];
  }>;
};

export default function AdminDashboardPage({
  searchParams,
}: DashboardPageProps) {
  return (
    <main className='flex flex-col gap-10 pb-12'>
      <header className='border-b border-border pb-7'>
        <p className='font-mono text-xs uppercase text-muted-foreground'>
          Beyond the Statute / Editorial desk
        </p>
        <div className='mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
          <div>
            <h1 className='font-heading text-5xl font-normal leading-none'>
              Overview
            </h1>
            <p className='mt-3 max-w-lg text-sm text-muted-foreground'>
              Publication activity at a glance.
            </p>
          </div>
          <p className='font-mono text-xs uppercase text-muted-foreground'>
            Dashboard
          </p>
        </div>
      </header>

      <Suspense fallback={<DashboardFallback />}>
        <DashboardContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function DashboardContent({ searchParams }: DashboardPageProps) {
  const search = await searchParams;
  const firstValue = (value?: string | string[]) =>
    Array.isArray(value) ? value[0] : value;

  const range = {
    days: firstValue(search.days),
    from: firstValue(search.from),
    to: firstValue(search.to),
  };

  const [initialStats, recentArticles, analytics] = await Promise.all([
    getDashboardStats(),
    db.article.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
      },
    }),
    getAnalyticsData(range),
  ]);

  return (
    <>
      <DashboardStats initialStats={initialStats} />

      <section
        aria-labelledby='analytics-heading'
        className='flex flex-col gap-6'
      >
        <div className='grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end'>
          <div>
            <p className='font-mono text-xs uppercase text-muted-foreground'>
              Publication performance
            </p>
            <h2
              className='mt-2 font-heading text-3xl font-normal'
              id='analytics-heading'
            >
              Reach &amp; readership
            </h2>
            <p className='mt-2 text-sm text-muted-foreground'>
              Views and newsletter signups for{' '}
              {analytics.rangeLabel.toLowerCase()}.
            </p>
          </div>
        </div>

        <AnalyticsRangeControls
          days={analytics.presetDays}
          from={analytics.isCustomRange ? analytics.rangeStart : undefined}
          to={analytics.isCustomRange ? analytics.rangeEnd : undefined}
        />

        <AnalyticsCharts data={analytics} />
      </section>

      <section aria-labelledby='articles-heading' className='flex flex-col'>
        <div className='flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4'>
          <div>
            <p className='font-mono text-xs uppercase text-muted-foreground'>
              The latest
            </p>
            <h2
              className='mt-2 font-heading text-3xl font-normal'
              id='articles-heading'
            >
              Recent articles
            </h2>
          </div>
          <Link
            className='text-sm underline decoration-border underline-offset-4 transition-colors hover:text-primary'
            href='/admin/articles'
          >
            View all
          </Link>
        </div>

        {recentArticles.length === 0 ? (
          <p className='py-8 text-sm text-muted-foreground'>No articles yet.</p>
        ) : (
          <ol>
            {recentArticles.map((article, index) => (
              <li
                className='border-b border-border last:border-0'
                key={article.id}
              >
                <Link
                  className='group grid gap-2 py-4 transition-colors sm:grid-cols-[3rem_minmax(0,1fr)_9rem_9rem] sm:items-center sm:gap-4'
                  href={`/admin/articles/${article.id}/edit`}
                >
                  <span className='font-mono text-xs text-muted-foreground'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='font-heading text-xl transition-colors group-hover:text-primary'>
                    {article.title}
                  </span>
                  <span className='text-sm capitalize text-muted-foreground'>
                    {article.status}
                  </span>
                  <time
                    className='text-sm text-muted-foreground'
                    dateTime={article.updatedAt.toISOString()}
                  >
                    {new Intl.DateTimeFormat('en', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }).format(article.updatedAt)}
                  </time>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}

function DashboardFallback() {
  return (
    <div
      aria-label='Loading dashboard'
      className='flex flex-col gap-10'
      role='status'
    >
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6'>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            className='space-y-3 border-t border-border px-4 py-5 first:pl-0'
            key={index}
          >
            <div className='h-3 w-24 animate-pulse bg-muted' />
            <div className='h-8 w-16 animate-pulse bg-muted' />
          </div>
        ))}
      </div>
      <div className='h-72 animate-pulse border-y border-border bg-muted' />
    </div>
  );
}
