import { deleteCategoryAction } from '@/actions/categories';
import { CategoryForm } from '@/components/admin/category-form';
import { ConfirmActionButton } from '@/components/admin/confirm-action-button';
import { db } from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { articles: true } },
    },
  });

  return (
    <main className='grid gap-8 xl:grid-cols-[20rem_1fr]'>
      <section className='flex flex-col gap-4'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>Categories</h1>
          <p className='mt-2 text-sm text-muted-foreground'>
            Group articles for the public website.
          </p>
        </div>
        <CategoryForm />
      </section>
      <section className='flex flex-col gap-4'>
        {categories.length === 0 ? (
          <p className='text-sm text-muted-foreground'>No categories yet.</p>
        ) : (
          <ul className='flex flex-col gap-4'>
            {categories.map((category) => (
              <li
                className='rounded-md border border-border bg-card p-5'
                key={category.id}
              >
                <div className='mb-4 flex items-start justify-between gap-4'>
                  <p className='text-sm text-muted-foreground'>
                    {category._count.articles} article
                    {category._count.articles === 1 ? '' : 's'}
                  </p>
                  <ConfirmActionButton
                    action={deleteCategoryAction.bind(null, category.id)}
                    label='Delete'
                    message='Delete this category?'
                  />
                </div>
                <CategoryForm
                  category={{
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    description: category.description ?? '',
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
