import { z } from 'zod';

export const commentSchema = z.object({
  articleId: z.string().min(1),
  displayName: z.string().trim().max(80).optional(),
  username: z.string().trim().max(40).optional(),
  email: z.email().optional(),
  content: z.string().trim().min(1, 'Comment is required').max(2000),
  company: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.email(),
  company: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80),
  email: z.email(),
  topic: z.enum(['general', 'partnership', 'media', 'contribution', 'other']),
  organization: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1, 'Message is required').max(2000),
  company: z.string().optional(),
});
