import { z } from 'zod';

export const contentReportSchema = z
  .object({
    articleId: z.string().optional(),
    commentId: z.string().optional(),
    reason: z.enum([
      'harmful_content',
      'privacy',
      'harassment',
      'misinformation',
      'other',
    ]),
    details: z.string().trim().max(1000).optional(),
    reporterEmail: z
      .union([z.literal(''), z.email('Enter a valid email address.')])
      .optional(),
  })
  .refine((value) => Boolean(value.articleId) !== Boolean(value.commentId), {
    message: 'Choose one article or comment to report.',
  });
