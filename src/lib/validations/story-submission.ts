import { z } from 'zod';

export const storySubmissionSchema = z
  .object({
    title: z.string().trim().min(1, 'A story title is required.').max(160),
    story: z
      .string()
      .trim()
      .min(100, 'Please share at least 100 characters.')
      .max(20_000),
    anonymous: z.enum(['yes', 'no']),
    name: z.string().trim().max(100).optional(),
    email: z
      .union([z.literal(''), z.email('Enter a valid email address.')])
      .optional(),
    consentToReview: z.literal('yes', {
      error:
        'Please confirm your submission may be reviewed by the editorial team.',
    }),
  })
  .superRefine((value, context) => {
    if (value.anonymous === 'no' && !value.name?.trim()) {
      context.addIssue({
        code: 'custom',
        path: ['name'],
        message: 'Enter your name or choose to remain anonymous.',
      });
    }
  });
