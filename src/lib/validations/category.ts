import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  slug: z.string().trim().max(80).optional(),
  description: z.string().trim().max(300).optional(),
});
