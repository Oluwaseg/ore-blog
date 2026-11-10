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
    <main className='flex flex-col gap-8'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Overview</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Publication activity at a glance.
        </p>
      </div>
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
        <div>
          <p className='font-mono text-xs uppercase tracking-wide text-muted-foreground'>
            Publication performance
          </p>
          <h2 className='mt-2 text-lg font-semibold' id='analytics-heading'>
            Analytics
          </h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Views and newsletter signups for{' '}
            {analytics.rangeLabel.toLowerCase()}.
          </p>
        </div>
        <AnalyticsRangeControls
          days={analytics.presetDays}
          from={analytics.isCustomRange ? analytics.rangeStart : undefined}
          to={analytics.isCustomRange ? analytics.rangeEnd : undefined}
        />
        <AnalyticsCharts data={analytics} />
      </section>
      <section className='flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-4'>
          <h2 className='text-lg font-semibold'>Recent articles</h2>
          <Link
            className='text-sm font-medium underline-offset-4 hover:underline'
            href='/admin/articles'
          >
            View all
          </Link>
        </div>
        {recentArticles.length === 0 ? (
          <p className='text-sm text-muted-foreground'>No articles yet.</p>
        ) : (
          <ul className='rounded-md border border-border bg-card'>
            {recentArticles.map((article) => (
              <li
                className='border-b border-border last:border-0'
                key={article.id}
              >
                <Link
                  className='flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors hover:bg-muted'
                  href={`/admin/articles/${article.id}/edit`}
                >
                  <span className='font-medium'>{article.title}</span>
                  <span className='text-muted-foreground'>
                    {article.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function DashboardFallback() {
  return (
    <div
      aria-label='Loading dashboard'
      className='flex flex-col gap-8'
      role='status'
    >
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            className='space-y-3 rounded-md border border-border bg-card p-5'
            key={index}
          >
            <div className='h-4 w-28 animate-pulse rounded bg-muted' />
            <div className='h-9 w-16 animate-pulse rounded bg-muted' />
          </div>
        ))}
      </div>
      <div className='h-40 animate-pulse rounded-md border border-border bg-card' />
    </div>
  );
}
