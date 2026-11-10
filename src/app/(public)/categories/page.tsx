import { listCategories } from '@/features/articles/public';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse articles by topic.',
};

export default async function CategoriesPage() {
  const categories = await listCategories();
  const visibleCategories = categories.filter(
    (category) => category._count.articles > 0
  );

  return (
    <div className='space-y-10'>
      <header className='max-w-3xl border-b border-border pb-8'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          Browse by topic
        </p>
        <h1 className='mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          Categories
        </h1>
        <p className='mt-4 text-base leading-7 text-muted-foreground'>
          Explore published work grouped by subject.
        </p>
      </header>

      {visibleCategories.length ? (
        <ul className='border-y border-border'>
          {visibleCategories.map((category) => (
            <li
              className='border-b border-border py-5 last:border-0'
              key={category.id}
            >
              <Link
                className='group flex flex-wrap items-baseline justify-between gap-3'
                href={`/categories/${category.slug}`}
              >
                <span className='font-heading text-2xl text-foreground group-hover:text-primary'>
                  {category.name}
                </span>
                <span className='text-sm text-muted-foreground'>
                  {category._count.articles}{' '}
                  {category._count.articles === 1 ? 'article' : 'articles'}
                </span>
              </Link>
              {category.description ? (
                <p className='mt-2 max-w-2xl text-sm leading-6 text-muted-foreground'>
                  {category.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className='border-l-2 border-primary/40 py-2 pl-5 text-sm text-muted-foreground'>
          Categories will appear here as articles are published.
        </p>
      )}
    </div>
  );
}
