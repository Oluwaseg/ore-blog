import { db } from '@/lib/db';
import { connection } from 'next/server';

const DAY_COUNT = 30;
const MAX_RANGE_DAYS = 365;
const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
const ALLOWED_DAY_RANGES = [30, 90, 120, 365] as const;

export type AnalyticsData = {
  rangeLabel: string;
  rangeDays: number;
  presetDays: number;
  isCustomRange: boolean;
  rangeStart: string;
  rangeEnd: string;
  viewsByDay: { date: string; views: number }[];
  subscribersByDay: { date: string; subscribers: number }[];
  topArticles: { title: string; views: number }[];
};

export type AnalyticsRangeInput = {
  days?: string;
  from?: string;
  to?: string;
};

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return Number.isNaN(date.getTime()) || dateKey(date) !== value ? null : date;
}

export async function getAnalyticsData(
  input: AnalyticsRangeInput = {}
): Promise<AnalyticsData> {
  await connection();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const requestedDays = Number.parseInt(input.days ?? '', 10);
  const days = ALLOWED_DAY_RANGES.includes(
    requestedDays as (typeof ALLOWED_DAY_RANGES)[number]
  )
    ? requestedDays
    : DAY_COUNT;
  const customStart = parseDate(input.from);
  const customEnd = parseDate(input.to);
  const hasCustomRange =
    customStart !== null &&
    customEnd !== null &&
    customStart.getTime() <= customEnd.getTime();
  const normalizedCustomEnd =
    hasCustomRange && customEnd
      ? customEnd.getTime() > today.getTime()
        ? today
        : customEnd
      : null;
  const customRangeValid = Boolean(
    customStart &&
    normalizedCustomEnd &&
    customStart.getTime() <= normalizedCustomEnd.getTime()
  );
  const lastDay =
    customRangeValid && normalizedCustomEnd ? normalizedCustomEnd : today;
  const requestedStart =
    customRangeValid && customStart
      ? customStart
      : new Date(today.getTime() - (days - 1) * DAY_MILLISECONDS);
  const earliestAllowedStart = new Date(
    lastDay.getTime() - (MAX_RANGE_DAYS - 1) * DAY_MILLISECONDS
  );
  const start =
    requestedStart < earliestAllowedStart
      ? earliestAllowedStart
      : requestedStart;
  const rangeLength =
    Math.floor((lastDay.getTime() - start.getTime()) / DAY_MILLISECONDS) + 1;
  const rangeEnd = new Date(lastDay.getTime() + DAY_MILLISECONDS);

  const [viewRows, subscriberRows, articleViewCounts] = await Promise.all([
    db.articleView.findMany({
      where: { viewedAt: { gte: start, lt: rangeEnd } },
      select: { viewedAt: true },
    }),
    db.newsletterSubscriber.findMany({
      where: { subscribedAt: { gte: start, lt: rangeEnd } },
      select: { subscribedAt: true },
    }),
    db.articleView.groupBy({
      by: ['articleId'],
      where: {
        viewedAt: { gte: start, lt: rangeEnd },
        article: { status: 'PUBLISHED' },
      },
      orderBy: { _count: { articleId: 'desc' } },
      take: 10,
      _count: { articleId: true },
    }),
  ]);

  const topArticles = articleViewCounts.length
    ? await db.article.findMany({
        where: { id: { in: articleViewCounts.map((item) => item.articleId) } },
        select: { id: true, title: true },
      })
    : [];
  const articleTitles = new Map(
    topArticles.map((article) => [article.id, article.title])
  );

  const viewsByDate = new Map<string, number>();
  const subscribersByDate = new Map<string, number>();

  for (const view of viewRows) {
    const key = dateKey(view.viewedAt);
    viewsByDate.set(key, (viewsByDate.get(key) ?? 0) + 1);
  }

  for (const subscriber of subscriberRows) {
    const key = dateKey(subscriber.subscribedAt);
    subscribersByDate.set(key, (subscribersByDate.get(key) ?? 0) + 1);
  }

  const viewsByDay: AnalyticsData['viewsByDay'] = [];
  const subscribersByDay: AnalyticsData['subscribersByDay'] = [];

  for (let offset = 0; offset < rangeLength; offset += 1) {
    const day = new Date(start.getTime() + offset * DAY_MILLISECONDS);
    const key = dateKey(day);
    viewsByDay.push({ date: key, views: viewsByDate.get(key) ?? 0 });
    subscribersByDay.push({
      date: key,
      subscribers: subscribersByDate.get(key) ?? 0,
    });
  }

  return {
    rangeLabel: customRangeValid
      ? `${dateKey(start)} to ${dateKey(lastDay)}`
      : `Last ${days} days`,
    rangeDays: rangeLength,
    presetDays: days,
    isCustomRange: customRangeValid,
    rangeStart: dateKey(start),
    rangeEnd: dateKey(lastDay),
    viewsByDay,
    subscribersByDay,
    topArticles: articleViewCounts.map((item) => ({
      title: articleTitles.get(item.articleId) ?? 'Published article',
      views: item._count.articleId,
    })),
  };
}
