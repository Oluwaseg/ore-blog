'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { verifyPassword, hashPassword } from '@/features/auth/password';
import { db } from '@/lib/db';
import { z } from 'zod';

export type SettingsFormState = {
  error?: string;
  success?: string;
} | null;

const publicationSettingsSchema = z.object({
  publicationName: z
    .string()
    .trim()
    .min(1, 'Publication name is required.')
    .max(100),
  tagline: z.string().trim().min(1, 'Tagline is required.').max(180),
  description: z.string().trim().min(1, 'Description is required.').max(500),
  metaTitle: z.string().trim().max(100).optional(),
  metaDescription: z.string().trim().max(300).optional(),
  logoUrl: z
    .string()
    .trim()
    .max(700_000, 'Uploaded logo must be under 500 KB after optimization.')
    .optional()
    .refine((value) => {
      if (!value) return true;
      if (/^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/.test(value)) return true;

      try {
        const url = new URL(value);
        return url.protocol === 'https:' || url.protocol === 'http:';
      } catch {
        return false;
      }
    }, 'Enter an HTTP(S) image URL or upload a supported image.'),
});

const accountSettingsSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required.'),
  email: z
    .email('Enter a valid email address.')
    .transform((email) => email.toLowerCase()),
  newPassword: z.union([
    z.literal(''),
    z.string().min(12, 'New password must be at least 12 characters.'),
  ]),
});

export async function savePublicationSettingsAction(
  _previousState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireAdmin();

  const parsed = publicationSettingsSchema.safeParse({
    publicationName: formData.get('publicationName'),
    tagline: formData.get('tagline'),
    description: formData.get('description'),
    metaTitle: formData.get('metaTitle') || undefined,
    metaDescription: formData.get('metaDescription') || undefined,
    logoUrl: formData.get('logoUrl') || undefined,
  });

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ?? 'Check the publication settings.',
    };
  }

  await db.publicationSettings.upsert({
    where: { id: 'default' },
    update: {
      ...parsed.data,
      metaTitle: parsed.data.metaTitle || null,
      metaDescription: parsed.data.metaDescription || null,
      logoUrl: parsed.data.logoUrl || null,
    },
    create: {
      id: 'default',
      ...parsed.data,
      metaTitle: parsed.data.metaTitle || null,
      metaDescription: parsed.data.metaDescription || null,
      logoUrl: parsed.data.logoUrl || null,
    },
  });

  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
  return { success: 'Publication settings saved.' };
}

export async function updateAdminAccountAction(
  _previousState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const currentAdmin = await requireAdmin();
  const parsed = accountSettingsSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    email: formData.get('email'),
    newPassword: formData.get('newPassword') ?? '',
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Check the account fields.',
    };
  }

  const admin = await db.admin.findUnique({
    where: { id: currentAdmin.id },
    select: { passwordHash: true },
  });

  if (
    !admin ||
    !(await verifyPassword(admin.passwordHash, parsed.data.currentPassword))
  ) {
    return { error: 'Current password is incorrect.' };
  }

  try {
    await db.admin.update({
      where: { id: currentAdmin.id },
      data: {
        email: parsed.data.email,
        ...(parsed.data.newPassword
          ? { passwordHash: await hashPassword(parsed.data.newPassword) }
          : {}),
      },
    });
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return { error: 'That email address is already in use.' };
    }

    throw error;
  }

  revalidatePath('/admin');
  revalidatePath('/admin/settings');
  return { success: 'Admin account settings updated.' };
}
