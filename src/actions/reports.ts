'use server';

import { publishedArticleWhere } from '@/features/articles/public';
import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { contentReportSchema } from '@/lib/validations/content-report';
import { revalidatePath } from 'next/cache';

export type ContentReportState = { error?: string; success?: string } | null;

export async function submitContentReportAction(
  _previousState: ContentReportState,
  formData: FormData
): Promise<ContentReportState> {
  if (String(formData.get('company') ?? '').trim()) {
    return { success: 'Thank you. Your report was received privately.' };
  }

  const parsed = contentReportSchema.safeParse({
    articleId: String(formData.get('articleId') ?? '') || undefined,
    commentId: String(formData.get('commentId') ?? '') || undefined,
    reason: formData.get('reason'),
    details: String(formData.get('details') ?? '').trim() || undefined,
    reporterEmail: String(formData.get('email') ?? '')
      .trim()
      .toLowerCase(),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Please check the report.',
    };
  }

  let articleId = parsed.data.articleId;

  if (parsed.data.commentId) {
    const comment = await db.comment.findFirst({
      where: {
        id: parsed.data.commentId,
        article: publishedArticleWhere(),
      },
      select: { articleId: true },
    });
    if (!comment) return { error: 'The reported comment could not be found.' };
    articleId = comment.articleId;
  } else {
    const article = await db.article.findFirst({
      where: { id: articleId, ...publishedArticleWhere() },
      select: { id: true },
    });
    if (!article) return { error: 'The reported article could not be found.' };
  }

  await db.contentReport.create({
    data: {
      articleId: parsed.data.commentId ? null : articleId,
      commentId: parsed.data.commentId ?? null,
      reason: parsed.data.reason,
      details: parsed.data.details || null,
      reporterEmail: parsed.data.reporterEmail || null,
    },
  });

  return {
    success: 'Thank you. Your report was received privately for review.',
  };
}

export async function updateContentReportAction(
  reportId: string,
  status: 'RESOLVED' | 'DISMISSED'
) {
  await requireAdmin();
  await db.contentReport.updateMany({
    where: { id: reportId, status: 'PENDING' },
    data: { status, reviewedAt: new Date() },
  });
  revalidatePath('/admin/reports');
}
