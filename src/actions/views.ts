"use server";

import { publishedArticleWhere } from "@/features/articles/public";
import { db } from "@/lib/db";

export async function recordArticleView(articleId: string) {
  const article = await db.article.findFirst({
    where: { id: articleId, ...publishedArticleWhere() },
    select: { id: true },
  });

  if (!article) {
    return;
  }

  await db.articleView.create({
    data: { articleId: article.id },
  });
}
