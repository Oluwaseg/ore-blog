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
    <div className='space-y-14 sm:space-y-20'>
      <header className='grid gap-6 border-b border-foreground/80 pb-8 lg:grid-cols-12 lg:items-end'>
        <div className='lg:col-span-8'>
          <p className='flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-primary'>
            <span aria-hidden className='h-px w-8 bg-primary' />
            The Articles
          </p>
          {/* <h1 className='mt-4 font-heading text-6xl leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl'>
            Articles<span className='text-primary'>.</span>
          </h1> */}
        </div>
        <p className='font-heading text-lg italic leading-7 text-muted-foreground lg:col-span-4 lg:border-l lg:border-border lg:pl-6'>
          Reporting, essays, and perspectives on awareness, education, and
          community care.
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

  if (!articles.length) {
    return (
      <div className='mx-auto max-w-xl py-16 text-center'>
        <p aria-hidden className='font-heading text-5xl text-primary'>
          ❦
        </p>
        <h2 className='mt-4 font-heading text-3xl italic text-foreground'>
          The journal is taking shape.
        </h2>
        <p className='mt-3 text-sm leading-6 text-muted-foreground'>
          Published stories will appear here. Please check back soon.
        </p>
      </div>
    );
  }

  const [lead, ...rest] = articles;

  return (
    <div className='space-y-16 sm:space-y-20'>
      <section aria-label='Latest article'>
        <ArticleCard article={lead} index={1} variant='lead' />
      </section>

      {rest.length ? (
        <section aria-labelledby='more-articles'>
          <div className='mb-10 flex items-center gap-4'>
            <h2
              className='font-heading text-sm uppercase tracking-[0.28em] text-foreground'
              id='more-articles'
            >
              More from the journal
            </h2>
            <span aria-hidden className='h-px flex-1 bg-border' />
            <span className='font-mono text-xs text-muted-foreground'>
              {articles.length} pieces
            </span>
          </div>
          <div className='grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-border [&>*]:lg:px-5 [&>*:nth-child(3n+1)]:lg:pl-0 [&>*:nth-child(3n)]:lg:pr-0 [&>*:nth-child(3n+1)]:lg:border-l-0'>
            {rest.map((article, i) => (
              <ArticleCard article={article} index={i + 2} key={article.id} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ArticlesFallback() {
  return (
    <div aria-label='Loading articles' className='space-y-16' role='status'>
      <div className='grid gap-8 lg:grid-cols-12 lg:gap-12'>
        <div className='aspect-[4/3] animate-pulse bg-muted lg:col-span-7' />
        <div className='flex flex-col justify-end gap-4 lg:col-span-5'>
          <div className='h-3 w-1/3 animate-pulse bg-muted' />
          <div className='h-12 w-full animate-pulse bg-muted' />
          <div className='h-12 w-3/4 animate-pulse bg-muted' />
          <div className='h-5 w-full animate-pulse bg-muted' />
        </div>
      </div>
      <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }, (_, index) => (
          <div className='space-y-4' key={index}>
            <div className='aspect-[3/2] animate-pulse bg-muted' />
            <div className='h-3 w-1/3 animate-pulse bg-muted' />
            <div className='h-7 w-4/5 animate-pulse bg-muted' />
          </div>
        ))}
      </div>
    </div>
  );
}
