import { CategoryManager } from '@/components/admin/category-manager';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Categories',
};

export default function AdminCategoriesPage() {
  return (
    <main className='flex flex-col gap-6'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>Categories</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Create and organize categories used to group articles.
        </p>
      </header>
      <Suspense fallback={<CategoriesFallback />}>
        <CategoryRows />
      </Suspense>
    </main>
  );
}

async function CategoryRows() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { articles: true } },
    },
  });

  return (
    <CategoryManager
      categories={categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        articleCount: category._count.articles,
      }))}
    />
  );
}

function CategoriesFallback() {
  return (
    <div
      aria-label='Loading categories'
      className='overflow-hidden rounded-md border border-border bg-card'
      role='status'
    >
      <div className='h-11 border-b border-border bg-muted' />
      {Array.from({ length: 5 }, (_, index) => (
        <div
          className='flex min-h-12 items-center gap-8 border-b border-border px-4 last:border-0'
          key={index}
        >
          <div className='h-4 flex-1 animate-pulse rounded bg-muted' />
          <div className='h-4 w-28 animate-pulse rounded bg-muted' />
          <div className='h-4 w-12 animate-pulse rounded bg-muted' />
          <div className='h-4 w-32 animate-pulse rounded bg-muted' />
        </div>
      ))}
    </div>
  );
}
