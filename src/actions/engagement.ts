"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateVisitorId } from "@/features/engagement/visitor";
import { db } from "@/lib/db";
import {
  commentSchema,
  contactSchema,
  newsletterSchema,
} from "@/lib/validations/engagement";
import { publishedArticleWhere } from "@/features/articles/public";

export type FormMessageState = {
  error?: string;
  success?: string;
} | null;

function isHoneypot(value: FormDataEntryValue | null) {
  return Boolean(String(value ?? "").trim());
}

export async function addCommentAction(
  _prevState: FormMessageState,
  formData: FormData,
): Promise<FormMessageState> {
  if (isHoneypot(formData.get("company"))) {
    return { success: "Comment published." };
  }

  const parsed = commentSchema.safeParse({
    articleId: formData.get("articleId"),
    displayName: String(formData.get("displayName") ?? "").trim() || undefined,
    username: String(formData.get("username") ?? "").trim() || undefined,
    email: String(formData.get("email") ?? "").trim() || undefined,
    content: formData.get("content"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Could not publish comment." };
  }

  const article = await db.article.findFirst({
    where: { id: parsed.data.articleId, ...publishedArticleWhere() },
    select: { id: true, slug: true },
  });

  if (!article) {
    return { error: "Article not found." };
  }

  await db.comment.create({
    data: {
      articleId: article.id,
      displayName: parsed.data.displayName ?? null,
      username: parsed.data.username ?? null,
      email: parsed.data.email ?? null,
      content: parsed.data.content,
    },
  });

  revalidatePath(`/articles/${article.slug}`);
  return { success: "Comment published." };
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
  formData: FormData,
): Promise<FormMessageState> {
  if (isHoneypot(formData.get("company"))) {
    return { success: "You are subscribed." };
  }

  const parsed = newsletterSchema.safeParse({
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email address." };
  }

  await db.newsletterSubscriber.upsert({
    where: { email: parsed.data.email },
    update: {
      status: "ACTIVE",
      unsubscribedAt: null,
    },
    create: {
      email: parsed.data.email,
      status: "ACTIVE",
    },
  });

  return { success: "You are subscribed." };
}

export async function sendContactAction(
  _prevState: FormMessageState,
  formData: FormData,
): Promise<FormMessageState> {
  if (isHoneypot(formData.get("company"))) {
    return { success: "Message received. Thank you." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  return { success: "Message received. Thank you." };
}
