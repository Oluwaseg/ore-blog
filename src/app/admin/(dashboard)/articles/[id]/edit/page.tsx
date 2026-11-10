import { ArticleForm } from '@/components/admin/article-form';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit article',
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [article, categories] = await Promise.all([
    db.article.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: { include: { tag: true } },
      },
    }),
    db.category.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    }),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <main className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Edit article</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Update content, metadata, categories, and publishing status.
        </p>
      </div>
      <ArticleForm
        article={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt ?? '',
          content: article.content,
          featuredImage: article.featuredImage ?? '',
          status: article.status,
          scheduledAt: article.scheduledAt,
          metaTitle: article.metaTitle ?? '',
          metaDescription: article.metaDescription ?? '',
          categoryIds: article.categories.map((item) => item.categoryId),
          tags: article.tags.map((item) => item.tag.name).join(', '),
        }}
        categories={categories}
      />
    </main>
  );
}
