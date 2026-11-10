import { db } from '@/lib/db';
import { createHmac } from 'node:crypto';

const MAX_COMMENTS_PER_WINDOW = 5;
const WINDOW_MILLISECONDS = 10 * 60 * 1000;

type NewComment = {
  articleId: string;
  displayName: string | null;
  username: string | null;
  email: string | null;
  content: string;
};

function submissionKey(clientAddress: string) {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error('AUTH_SECRET is not set');
  }

  return createHmac('sha256', secret).update(clientAddress).digest('hex');
}

export async function createCommentWithinRateLimit(
  comment: NewComment,
  clientAddress: string
): Promise<boolean> {
  const key = submissionKey(clientAddress);
  const cutoff = new Date(Date.now() - WINDOW_MILLISECONDS);

  return db.$transaction(async (transaction) => {
    await transaction.$queryRaw<{ locked: string }[]>`
      SELECT pg_advisory_xact_lock(hashtext(${key}))::text AS locked
    `;

    const recentCommentCount = await transaction.comment.count({
      where: {
        submissionKey: key,
        createdAt: { gte: cutoff },
      },
    });

    if (recentCommentCount >= MAX_COMMENTS_PER_WINDOW) {
      return false;
    }

    await transaction.comment.create({
      data: { ...comment, submissionKey: key },
    });

    return true;
  });
}
