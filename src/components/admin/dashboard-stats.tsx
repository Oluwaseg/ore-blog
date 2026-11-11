'use client';

import type { DashboardStats as DashboardStatsData } from '@/features/admin/dashboard';
import { useQuery } from '@tanstack/react-query';

const statLabels = [
  ['Total articles', 'totalArticles'],
  ['Published', 'publishedArticles'],
  ['Drafts', 'draftArticles'],
  ['Scheduled', 'scheduledArticles'],
  ['Subscribers', 'subscribers'],
  ['Article views', 'views'],
] as const;

async function fetchDashboardStats(): Promise<DashboardStatsData> {
  const response = await fetch('/api/admin/dashboard/stats', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Dashboard statistics could not be refreshed.');
  }

  return response.json();
}

export function DashboardStats({
  initialStats,
}: {
  initialStats: DashboardStatsData;
}) {
  const { data, isError, isFetching } = useQuery({
    queryKey: ['admin', 'dashboard-stats'],
    queryFn: fetchDashboardStats,
    initialData: initialStats,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });

  return (
    <section aria-label='Dashboard statistics'>
      <div
        aria-live='polite'
        className='mb-2 min-h-5 text-right text-xs text-muted-foreground'
      >
        {isFetching
          ? 'Refreshing statistics…'
          : isError
            ? 'Could not refresh. Showing last loaded values.'
            : null}
      </div>

      <dl className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6'>
        {statLabels.map(([label, key], index) => (
          <div
            className={`border-t border-border py-4 ${
              index % 2 === 0 ? 'pr-4' : 'border-l pl-4'
            } md:border-l md:px-4 md:first:pl-0 xl:px-5 xl:first:pl-0`}
            key={key}
          >
            <dt className='font-mono text-xs uppercase text-muted-foreground'>
              {label}
            </dt>
            <dd className='mt-2 font-heading text-4xl font-normal tabular-nums'>
              {data[key]}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
