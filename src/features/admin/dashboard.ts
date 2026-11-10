import { db } from '@/lib/db';

export type DashboardStats = {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  scheduledArticles: number;
  subscribers: number;
  views: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    totalArticles,
    publishedArticles,
    draftArticles,
    scheduledArticles,
    subscribers,
    views,
  ] = await Promise.all([
    db.article.count(),
    db.article.count({ where: { status: 'PUBLISHED' } }),
    db.article.count({ where: { status: 'DRAFT' } }),
    db.article.count({ where: { status: 'SCHEDULED' } }),
    db.newsletterSubscriber.count({ where: { status: 'ACTIVE' } }),
    db.articleView.count(),
  ]);

  return {
    totalArticles,
    publishedArticles,
    draftArticles,
    scheduledArticles,
    subscribers,
    views,
  };
}
