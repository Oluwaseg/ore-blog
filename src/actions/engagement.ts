'use server';

import { publishedArticleWhere } from '@/features/articles/public';
import { createCommentWithinRateLimit } from '@/features/engagement/comment-rate-limit';
import { getOrCreateVisitorId } from '@/features/engagement/visitor';
import {
  createUnsubscribeToken,
  verifyUnsubscribeToken,
} from '@/features/newsletter/unsubscribe-token';
import { db } from '@/lib/db';
import {
  sendContactEnquiryEmail,
  sendNewsletterUnsubscribeEmail,
  sendNewsletterWelcomeEmail,
} from '@/lib/newsletter-email';
import {
  commentSchema,
  contactSchema,
  newsletterSchema,
} from '@/lib/validations/engagement';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type FormMessageState = {
  error?: string;
  success?: string;
} | null;

function isHoneypot(value: FormDataEntryValue | null) {
  return Boolean(String(value ?? '').trim());
}

export async function addCommentAction(
  _prevState: FormMessageState,
  formData: FormData
): Promise<FormMessageState> {
  if (isHoneypot(formData.get('company'))) {
    return { success: 'Comment published.' };
  }

  const parsed = commentSchema.safeParse({
    articleId: formData.get('articleId'),
    displayName: String(formData.get('displayName') ?? '').trim() || undefined,
    username: String(formData.get('username') ?? '').trim() || undefined,
    email: String(formData.get('email') ?? '').trim() || undefined,
    content: formData.get('content'),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Could not publish comment.',
    };
  }

  const article = await db.article.findFirst({
    where: { id: parsed.data.articleId, ...publishedArticleWhere() },
    select: { id: true, slug: true },
  });

  if (!article) {
    return { error: 'Article not found.' };
  }

  const requestHeaders = await headers();
  const clientAddress =
    requestHeaders.get('x-real-ip')?.trim() ||
    requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    (await getOrCreateVisitorId());

  const created = await createCommentWithinRateLimit(
    {
      articleId: article.id,
      displayName: parsed.data.displayName ?? null,
      username: parsed.data.username ?? null,
      email: parsed.data.email ?? null,
      content: parsed.data.content,
    },
    clientAddress
  );

  if (!created) {
    return {
      error:
        'Too many comments. Please wait a few minutes before trying again.',
    };
  }

  revalidatePath(`/articles/${article.slug}`);
  return { success: 'Comment published.' };
}

export async function toggleReactionAction(articleId: string) {
  const article = await db.article.findFirst({
    where: { id: articleId, ...publishedArticleWhere() },
    select: { id: true, slug: true },
  });

  if (!article) {
    return;
  }

  const identifier = await getOrCreateVisitorId();
  const existing = await db.reaction.findUnique({
    where: {
      articleId_identifier: {
        articleId: article.id,
        identifier,
      },
    },
  });

  if (existing) {
    await db.reaction.delete({ where: { id: existing.id } });
  } else {
    await db.reaction.create({
      data: {
        articleId: article.id,
        identifier,
      },
    });
  }

  revalidatePath(`/articles/${article.slug}`);
}

export async function subscribeNewsletterAction(
  _prevState: FormMessageState,
  formData: FormData
): Promise<FormMessageState> {
  if (isHoneypot(formData.get('company'))) {
    return { success: 'You are subscribed.' };
  }

  const parsed = newsletterSchema.safeParse({
    email: String(formData.get('email') ?? '')
      .trim()
      .toLowerCase(),
  });

  if (!parsed.success) {
    return { error: 'Enter a valid email address.' };
  }

  const existingSubscriber = await db.newsletterSubscriber.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, status: true },
  });

  if (existingSubscriber?.status === 'ACTIVE') {
    return { success: 'Thanks. This address is already subscribed.' };
  }

  const subscriber = await db.newsletterSubscriber.upsert({
    where: { email: parsed.data.email },
    update: {
      status: 'ACTIVE',
      unsubscribedAt: null,
    },
    create: {
      email: parsed.data.email,
      status: 'ACTIVE',
    },
  });

  const appUrl = process.env.APP_URL;

  if (!appUrl) {
    return {
      success:
        'Your subscription is saved. Email delivery is not configured yet.',
    };
  }

  try {
    const token = await createUnsubscribeToken(subscriber.id);
    const unsubscribeUrl = new URL('/unsubscribe', appUrl);
    unsubscribeUrl.searchParams.set('token', token);

    const sent = await sendNewsletterWelcomeEmail({
      email: subscriber.email,
      unsubscribeUrl: unsubscribeUrl.toString(),
    });

    return {
      success: sent
        ? 'You are subscribed. Check your inbox for a welcome email.'
        : 'Your subscription is saved. Email delivery is not configured yet.',
    };
  } catch (error) {
    console.error('Newsletter welcome email could not be sent.', error);
    return {
      success:
        'Your subscription is saved, but the welcome email could not be sent.',
    };
  }
}

export async function unsubscribeNewsletterAction(formData: FormData) {
  const token = String(formData.get('token') ?? '');
  const subscriberId = await verifyUnsubscribeToken(token);

  if (!subscriberId) {
    redirect('/unsubscribe?status=invalid');
  }

  const subscriber = await db.newsletterSubscriber.findUnique({
    where: { id: subscriberId },
    select: { email: true, status: true },
  });

  const result = await db.newsletterSubscriber.updateMany({
    where: { id: subscriberId, status: 'ACTIVE' },
    data: {
      status: 'UNSUBSCRIBED',
      unsubscribedAt: new Date(),
    },
  });

  if (result.count > 0 && subscriber?.status === 'ACTIVE') {
    try {
      await sendNewsletterUnsubscribeEmail({ email: subscriber.email });
    } catch (error) {
      console.error('Newsletter unsubscribe email could not be sent.', error);
    }
  }

  revalidatePath('/admin/subscribers');
  revalidatePath('/admin');
  redirect('/unsubscribe?status=success');
}

export async function sendContactAction(
  _prevState: FormMessageState,
  formData: FormData
): Promise<FormMessageState> {
  if (isHoneypot(formData.get('company'))) {
    return { success: 'Message received. Thank you.' };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    topic: formData.get('topic'),
    organization:
      String(formData.get('organization') ?? '').trim() || undefined,
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Check the form and try again.',
    };
  }

  try {
    const sent = await sendContactEnquiryEmail(parsed.data);
    return {
      success: sent
        ? 'Your message has been sent. Thank you for getting in touch.'
        : 'Your message is ready, but email delivery is not configured yet.',
    };
  } catch (error) {
    console.error('Contact enquiry email could not be sent.', error);
    return {
      error: 'We could not send your message just now. Please try again later.',
    };
  }
}
