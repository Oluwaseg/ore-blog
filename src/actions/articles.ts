'use server';

import { uniqueArticleSlug } from '@/features/articles/slug';
import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { isBlankHtml, parseTagNames, slugify } from '@/lib/slug';
import { articleFormSchema } from '@/lib/validations/article';
import { revalidatePath } from 'next/cache';

export type ArticleFormState = {
  error?: string;
  success?: string;
  redirectTo?: string;
} | null;

function formValues(formData: FormData) {
  return {
    title: formData.get('title'),
    slug: formData.get('slug') || undefined,
    excerpt: formData.get('excerpt') || undefined,
    contentWarning: formData.get('contentWarning') || undefined,
    content: formData.get('content'),
    featuredImage:
      String(formData.get('featuredImage') || '').trim() || undefined,
    status: formData.get('status'),
    scheduledAt: formData.get('scheduledAt') || undefined,
    metaTitle: formData.get('metaTitle') || undefined,
    metaDescription: formData.get('metaDescription') || undefined,
    categoryIds: formData.getAll('categoryIds').filter(Boolean),
    tags: formData.get('tags') || undefined,
  };
}

function publishingFields(
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED',
  scheduledAt?: string
) {
  const scheduledDate = scheduledAt ? new Date(scheduledAt) : null;
  const now = new Date();

  if (status === 'PUBLISHED') {
    return {
      status,
      publishedAt: now,
      scheduledAt: null,
    };
  }

  if (status === 'SCHEDULED' && scheduledDate && scheduledDate <= now) {
    return {
      status: 'PUBLISHED' as const,
      publishedAt: now,
      scheduledAt: null,
    };
  }

  if (status === 'SCHEDULED') {
    return {
      status,
      publishedAt: null,
      scheduledAt: scheduledDate,
    };
  }

  return {
    status,
    publishedAt: null,
    scheduledAt: null,
  };
}

async function syncTags(articleId: string, tagNames: string[]) {
  const tags = await Promise.all(
    tagNames.map(async (name) => {
      const slug = slugify(name);

      return db.tag.upsert({
        where: { slug },
        update: { name },
        create: { name, slug },
      });
    })
  );

  await db.articleTag.deleteMany({ where: { articleId } });

  if (tags.length > 0) {
    await db.articleTag.createMany({
      data: tags.map((tag) => ({ articleId, tagId: tag.id })),
    });
  }
}

async function syncCategories(articleId: string, categoryIds: string[]) {
  await db.articleCategory.deleteMany({ where: { articleId } });

  if (categoryIds.length > 0) {
    await db.articleCategory.createMany({
      data: categoryIds.map((categoryId) => ({ articleId, categoryId })),
    });
  }
}

export async function saveArticleAction(
  articleId: string | null,
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  await requireAdmin();

  const parsed = articleFormSchema.safeParse(formValues(formData));

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ??
        'Check the article fields and try again.',
    };
  }

  if (isBlankHtml(parsed.data.content)) {
    return { error: 'Content is required.' };
  }

  const slug = await uniqueArticleSlug(
    parsed.data.title,
    parsed.data.slug,
    articleId ?? undefined
  );
  const publishing = publishingFields(
    parsed.data.status,
    parsed.data.scheduledAt
  );
  const tagNames = parseTagNames(parsed.data.tags ?? '');

  const data = {
    title: parsed.data.title,
    slug,
    excerpt: parsed.data.excerpt || null,
    contentWarning: parsed.data.contentWarning || null,
    content: parsed.data.content,
    featuredImage: parsed.data.featuredImage || null,
    metaTitle: parsed.data.metaTitle || null,
    metaDescription: parsed.data.metaDescription || null,
    ...publishing,
  };

  const article = articleId
    ? await db.article.update({
        where: { id: articleId },
        data,
      })
    : await db.article.create({ data });

  await syncCategories(article.id, parsed.data.categoryIds);
  await syncTags(article.id, tagNames);

  revalidatePath('/admin');
  revalidatePath('/admin/articles');
  return {
    success: articleId ? 'Article updated.' : 'Article created.',
    redirectTo: `/admin/articles/${article.id}/edit`,
  };
}

export async function deleteArticleAction(articleId: string) {
  await requireAdmin();

  await db.article.delete({
    where: { id: articleId },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/articles');
}
