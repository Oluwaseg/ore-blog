import type { Metadata } from "next";
import { ArticleForm } from "@/components/admin/article-form";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "New article",
};

export default async function NewArticlePage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New article</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Save as a draft, publish now, or schedule for later.
        </p>
      </div>
      <ArticleForm categories={categories} />
    </main>
  );
}
