import { ArticleCard } from '@/components/public/article-card';
import { listPublishedArticles } from '@/features/articles/public';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Read published articles and perspectives.',
};

export default function ArticlesPage() {
  return (
    <div className='space-y-8'>
      <header className='flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4'>
        <h1 className='font-heading text-3xl text-foreground'>Articles</h1>
        <p className='text-sm text-muted-foreground'>
          Essays, notes &amp; dispatches
        </p>
      </header>

      <Suspense fallback={<ArticlesFallback />}>
        <PublishedArticles />
      </Suspense>
    </div>
  );
}

async function PublishedArticles() {
  const articles = await listPublishedArticles();

  return articles.length ? (
    <section
      aria-label='Published articles'
      className='grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'
    >
      {articles.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </section>
  ) : (
    <p className='py-10 text-sm text-muted-foreground'>
      No stories yet. Please check back soon.
    </p>
  );
}

function ArticlesFallback() {
  return (
    <div
      aria-label='Loading articles'
      className='grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'
      role='status'
    >
      {Array.from({ length: 6 }, (_, i) => (
        <div className='space-y-3' key={i}>
          <div className='aspect-[3/2] animate-pulse bg-muted' />
          <div className='h-3 w-1/3 animate-pulse bg-muted' />
          <div className='h-6 w-4/5 animate-pulse bg-muted' />
        </div>
      ))}
    </div>
  );
}
