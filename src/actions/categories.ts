'use server';

import { uniqueCategorySlug } from '@/features/articles/slug';
import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { categoryFormSchema } from '@/lib/validations/category';
import { revalidatePath } from 'next/cache';

export type CategoryFormState = {
  error?: string;
  success?: boolean;
} | null;

export async function saveCategoryAction(
  categoryId: string | null,
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireAdmin();

  const parsed = categoryFormSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug') || undefined,
    description: formData.get('description') || undefined,
  });

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ??
        'Check the category fields and try again.',
    };
  }

  const slug = await uniqueCategorySlug(
    parsed.data.name,
    parsed.data.slug,
    categoryId ?? undefined
  );
  const data = {
    name: parsed.data.name,
    slug,
    description: parsed.data.description || null,
  };

  if (categoryId) {
    await db.category.update({
      where: { id: categoryId },
      data,
    });
  } else {
    await db.category.create({ data });
  }

  revalidatePath('/admin/categories');
  revalidatePath('/admin/articles');
  return { success: true };
}

export async function deleteCategoryAction(categoryId: string) {
  await requireAdmin();

  await db.category.delete({
    where: { id: categoryId },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/admin/articles');
}
