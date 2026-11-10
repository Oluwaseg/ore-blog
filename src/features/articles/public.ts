import { db } from "@/lib/db";

export function publishedArticleWhere() {
  return {
    status: "PUBLISHED" as const,
    publishedAt: { lte: new Date() },
  };
}

const articleCardSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  featuredImage: true,
  publishedAt: true,
  categories: {
    include: { category: true },
  },
} as const;

export async function listPublishedArticles(take?: number) {
  return db.article.findMany({
    where: publishedArticleWhere(),
    orderBy: { publishedAt: "desc" },
    take,
    select: articleCardSelect,
  });
}

export async function searchPublishedArticles(query: string) {
  return db.article.findMany({
    where: {
      ...publishedArticleWhere(),
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { excerpt: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    select: articleCardSelect,
  });
}

export async function getPublishedArticle(slug: string) {
  return db.article.findFirst({
    where: {
      slug,
      ...publishedArticleWhere(),
    },
    include: {
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
      comments: { orderBy: { createdAt: "asc" } },
      _count: { select: { reactions: true, comments: true } },
    },
  });
}

export async function listCategories() {
  return db.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          articles: {
            where: { article: publishedArticleWhere() },
          },
        },
      },
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return db.category.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { article: publishedArticleWhere() },
        include: {
          article: { select: articleCardSelect },
        },
        orderBy: { article: { publishedAt: "desc" } },
      },
    },
  });
}
