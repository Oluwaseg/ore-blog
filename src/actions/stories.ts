'use server';

import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { storySubmissionSchema } from '@/lib/validations/story-submission';
import { revalidatePath } from 'next/cache';

export type StorySubmissionState = {
  error?: string;
  success?: string;
} | null;

export async function submitStoryAction(
  _previousState: StorySubmissionState,
  formData: FormData
): Promise<StorySubmissionState> {
  if (String(formData.get('company') ?? '').trim()) {
    return { success: 'Your submission has been received for review.' };
  }

  const parsed = storySubmissionSchema.safeParse({
    title: formData.get('title'),
    story: formData.get('story'),
    anonymous: formData.get('anonymous'),
    name: String(formData.get('name') ?? '').trim() || undefined,
    email: String(formData.get('email') ?? '')
      .trim()
      .toLowerCase(),
    consentToReview: formData.get('consentToReview'),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Please check your submission.',
    };
  }

  await db.storySubmission.create({
    data: {
      title: parsed.data.title,
      story: parsed.data.story,
      anonymous: parsed.data.anonymous === 'yes',
      name:
        parsed.data.anonymous === 'yes'
          ? null
          : parsed.data.name?.trim() || null,
      email: parsed.data.email || null,
      consentToReview: true,
      status: 'PENDING',
    },
  });

  return {
    success:
      'Your story was received privately for editorial review. It has not been published.',
  };
}

export async function reviewStorySubmissionAction(
  submissionId: string,
  decision: 'APPROVED' | 'REJECTED'
) {
  await requireAdmin();

  await db.storySubmission.updateMany({
    where: { id: submissionId, status: 'PENDING' },
    data: { status: decision, reviewedAt: new Date() },
  });

  revalidatePath('/admin/stories');
}
