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
      <div className='mb-3 flex min-h-5 items-center justify-end'>
        {isFetching ? (
          <p aria-live='polite' className='text-xs text-muted-foreground'>
            Refreshing statistics…
          </p>
        ) : isError ? (
          <p aria-live='polite' className='text-xs text-destructive'>
            Could not refresh. Showing last loaded values.
          </p>
        ) : null}
      </div>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {statLabels.map(([label, key]) => (
          <div
            className='rounded-md border border-border bg-card p-5'
            key={key}
          >
            <p className='text-sm text-muted-foreground'>{label}</p>
            <p className='mt-2 text-3xl font-semibold'>{data[key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
