import { db } from '@/lib/db';
import { getSiteUrl } from '@/lib/site-url';
import type { MetadataRoute } from 'next';
import { connection } from 'next/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  const siteUrl = getSiteUrl();
  const [articles, categories] = await Promise.all([
    db.article.findMany({
      where: { status: 'PUBLISHED', publishedAt: { not: null } },
      select: { slug: true, publishedAt: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
    }),
    db.category.findMany({
      where: {
        articles: {
          some: {
            article: { status: 'PUBLISHED', publishedAt: { not: null } },
          },
        },
      },
      select: { slug: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  const staticPages = ['', '/about', '/articles', '/categories', '/contact'];

  return [
    ...staticPages.map((path) => ({
      url: new URL(path, siteUrl).toString(),
    })),
    ...articles.map((article) => ({
      url: new URL(`/articles/${article.slug}`, siteUrl).toString(),
      lastModified: article.updatedAt,
    })),
    ...categories.map((category) => ({
      url: new URL(`/categories/${category.slug}`, siteUrl).toString(),
    })),
  ];
}
