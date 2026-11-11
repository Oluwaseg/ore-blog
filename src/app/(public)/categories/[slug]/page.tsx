import { ArticleCard } from '@/components/public/article-card';
import { getCategoryBySlug } from '@/features/articles/public';
import { getSiteUrl } from '@/lib/site-url';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  return category
    ? {
        title: category.name,
        description: category.description || `Articles in ${category.name}.`,
        alternates: {
          canonical: new URL(
            `/categories/${category.slug}`,
            getSiteUrl()
          ).toString(),
        },
      }
    : { title: 'Category not found', robots: { index: false, follow: false } };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryFallback />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = category.articles.map(({ article }) => article);

  return (
    <div className='space-y-10'>
      <header className='max-w-3xl border-b border-border pb-8'>
        <Link
          className='text-sm text-muted-foreground hover:text-primary'
          href='/categories'
        >
          All categories
        </Link>
        <h1 className='mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          {category.name}
        </h1>
        {category.description ? (
          <p className='mt-4 text-base leading-7 text-muted-foreground'>
            {category.description}
          </p>
        ) : null}
      </header>

      {articles.length ? (
        <section
          aria-label={`${category.name} articles`}
          className='grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'
        >
          {articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </section>
      ) : (
        <p className='text-sm text-muted-foreground'>
          There are no published articles in this category yet.
        </p>
      )}
    </div>
  );
}

function CategoryFallback() {
  return (
    <div aria-label='Loading category' className='space-y-8' role='status'>
      <div className='space-y-4 border-b border-border pb-8'>
        <div className='h-4 w-28 animate-pulse rounded bg-muted' />
        <div className='h-12 w-2/3 animate-pulse rounded bg-muted' />
      </div>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }, (_, index) => (
          <div className='space-y-4' key={index}>
            <div className='aspect-3/2 animate-pulse rounded-md bg-muted' />
            <div className='h-6 w-4/5 animate-pulse rounded bg-muted' />
            <div className='h-4 w-full animate-pulse rounded bg-muted' />
          </div>
        ))}
      </div>
    </div>
  );
}
