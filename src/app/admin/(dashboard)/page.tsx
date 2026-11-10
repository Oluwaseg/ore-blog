import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const [
    totalArticles,
    publishedArticles,
    draftArticles,
    scheduledArticles,
    subscribers,
    views,
    recentArticles,
  ] = await Promise.all([
    db.article.count(),
    db.article.count({ where: { status: "PUBLISHED" } }),
    db.article.count({ where: { status: "DRAFT" } }),
    db.article.count({ where: { status: "SCHEDULED" } }),
    db.newsletterSubscriber.count({ where: { status: "ACTIVE" } }),
    db.articleView.count(),
    db.article.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
      },
    }),
  ]);

  const stats = [
    { label: "Total articles", value: totalArticles },
    { label: "Published", value: publishedArticles },
    { label: "Drafts", value: draftArticles },
    { label: "Scheduled", value: scheduledArticles },
    { label: "Subscribers", value: subscribers },
    { label: "Article views", value: views },
  ];

  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Publication activity at a glance.
        </p>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
            key={stat.label}
          >
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Recent articles</h2>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/admin/articles"
          >
            View all
          </Link>
        </div>
        {recentArticles.length === 0 ? (
          <p className="text-sm text-zinc-500">No articles yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {recentArticles.map((article) => (
              <li key={article.id}>
                <Link
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  href={`/admin/articles/${article.id}/edit`}
                >
                  <span className="font-medium">{article.title}</span>
                  <span className="text-zinc-500">{article.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
