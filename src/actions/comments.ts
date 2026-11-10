'use server';

import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteCommentAction(commentId: string): Promise<void> {
  await requireAdmin();

  const comment = await db.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      article: { select: { slug: true } },
    },
  });

  if (!comment) {
    return;
  }

  await db.comment.delete({ where: { id: comment.id } });
  revalidatePath('/admin/comments');
  revalidatePath(`/articles/${comment.article.slug}`);
}
