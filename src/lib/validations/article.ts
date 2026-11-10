import { z } from "zod";

export const articleStatusSchema = z.enum([
  "DRAFT",
  "SCHEDULED",
  "PUBLISHED",
  "ARCHIVED",
]);

export const articleFormSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(200),
    slug: z.string().trim().max(80).optional(),
    excerpt: z.string().trim().max(500).optional(),
    content: z.string().min(1, "Content is required"),
    featuredImage: z.url().optional(),
    status: articleStatusSchema,
    scheduledAt: z.string().optional(),
    metaTitle: z.string().trim().max(70).optional(),
    metaDescription: z.string().trim().max(160).optional(),
    categoryIds: z.array(z.string().min(1)).default([]),
    tags: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.status === "SCHEDULED" && !value.scheduledAt) {
      ctx.addIssue({
        code: "custom",
        path: ["scheduledAt"],
        message: "A schedule date is required.",
      });
    }
  });
