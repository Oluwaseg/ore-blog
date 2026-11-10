'use client';

import type { AnalyticsData } from '@/features/admin/analytics';
import ReactECharts from 'echarts-for-react';

export function AnalyticsCharts({ data }: { data: AnalyticsData }) {
  const styles = {
    text: 'var(--foreground)',
    muted: 'var(--muted-foreground)',
    border: 'var(--border)',
    primary: 'var(--primary)',
    accent: 'var(--chart-3)',
  };

  const common = {
    animationDuration: 450,
    textStyle: { fontFamily: 'var(--font-dm-sans)' },
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'var(--popover)',
      borderColor: styles.border,
      textStyle: { color: styles.text },
    },
    grid: { left: 44, right: 24, top: 28, bottom: 56 },
  };

  const viewsOption = {
    ...common,
    color: [styles.primary],
    xAxis: {
      type: 'category' as const,
      data: data.viewsByDay.map((item) => item.date.slice(5)),
      axisLabel: { color: styles.muted, interval: 4 },
      axisLine: { lineStyle: { color: styles.border } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value' as const,
      minInterval: 1,
      axisLabel: { color: styles.muted },
      splitLine: {
        lineStyle: { color: styles.border, type: 'dashed' as const },
      },
    },
    series: [
      {
        name: 'Views',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: data.viewsByDay.map((item) => item.views),
        areaStyle: { opacity: 0.1 },
      },
    ],
  };

  const subscribersOption = {
    ...common,
    color: [styles.accent],
    xAxis: {
      type: 'category' as const,
      data: data.subscribersByDay.map((item) => item.date.slice(5)),
      axisLabel: { color: styles.muted, interval: 4 },
      axisLine: { lineStyle: { color: styles.border } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value' as const,
      minInterval: 1,
      axisLabel: { color: styles.muted },
      splitLine: {
        lineStyle: { color: styles.border, type: 'dashed' as const },
      },
    },
    series: [
      {
        name: 'New subscribers',
        type: 'bar',
        barMaxWidth: 18,
        data: data.subscribersByDay.map((item) => item.subscribers),
      },
    ],
  };

  const articlesOption = {
    ...common,
    color: [styles.primary],
    grid: { left: 120, right: 28, top: 12, bottom: 28 },
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: { type: 'shadow' as const },
      backgroundColor: 'var(--popover)',
      borderColor: styles.border,
      textStyle: { color: styles.text },
    },
    xAxis: {
      type: 'value' as const,
      minInterval: 1,
      axisLabel: { color: styles.muted },
      splitLine: {
        lineStyle: { color: styles.border, type: 'dashed' as const },
      },
    },
    yAxis: {
      type: 'category' as const,
      inverse: true,
      data: data.topArticles.map((item) => item.title),
      axisLabel: {
        color: styles.text,
        width: 104,
        overflow: 'truncate' as const,
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'Views',
        type: 'bar',
        barMaxWidth: 20,
        data: data.topArticles.map((item) => item.views),
      },
    ],
  };

  return (
    <div className='grid gap-6 xl:grid-cols-2'>
      <ChartSection title={`Article views · ${data.rangeLabel}`}>
        {data.viewsByDay.some((item) => item.views > 0) ? (
          <ReactECharts
            option={viewsOption}
            style={{ height: 300 }}
            notMerge
            lazyUpdate
          />
        ) : (
          <ChartEmpty message='View activity will appear here as readers visit published articles.' />
        )}
      </ChartSection>
      <ChartSection title={`New subscribers · ${data.rangeLabel}`}>
        {data.subscribersByDay.some((item) => item.subscribers > 0) ? (
          <ReactECharts
            option={subscribersOption}
            style={{ height: 300 }}
            notMerge
            lazyUpdate
          />
        ) : (
          <ChartEmpty message='New newsletter signups will appear here.' />
        )}
      </ChartSection>
      <ChartSection
        title={`Most-read published articles · ${data.rangeLabel}`}
        className='xl:col-span-2'
      >
        {data.topArticles.some((article) => article.views > 0) ? (
          <ReactECharts
            option={articlesOption}
            style={{ height: Math.max(280, data.topArticles.length * 38) }}
            notMerge
            lazyUpdate
          />
        ) : (
          <ChartEmpty message='No published articles have recorded views yet.' />
        )}
      </ChartSection>
    </div>
  );
}

function ChartSection({
  children,
  title,
  className = '',
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-md border border-border bg-card p-5 ${className}`}
    >
      <h2 className='mb-4 text-sm font-semibold text-card-foreground'>
        {title}
      </h2>
      {children}
    </section>
  );
}

function ChartEmpty({ message }: { message: string }) {
  return (
    <div className='flex h-75 items-center justify-center px-6 text-center text-sm text-muted-foreground'>
      {message}
    </div>
  );
}
