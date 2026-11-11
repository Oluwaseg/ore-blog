import { ArticleCard } from '@/components/public/article-card';
import { searchPublishedArticles } from '@/features/articles/public';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search published articles.',
  robots: { index: false, follow: true },
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className='pb-16'>
      <Suspense fallback={<SearchFallback />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function BigSearch({ query }: { query: string }) {
  return (
    <header className='border-b border-foreground/80 pb-10'>
      <p className='flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-primary'>
        <span aria-hidden className='h-px w-8 bg-primary' />
        Search the journal
      </p>
      <form action='/search' className='group mt-6' role='search'>
        <label className='sr-only' htmlFor='search-page-query'>
          Search articles
        </label>
        <div className='flex items-end gap-4 border-b-2 border-border pb-3 transition-colors focus-within:border-primary'>
          <span
            aria-hidden
            className='hidden pb-2 font-heading text-4xl italic text-primary sm:block'
          >
            ⁂
          </span>
          <input
            autoFocus={!query}
            className='w-full min-w-0 bg-transparent font-heading text-4xl leading-tight text-foreground outline-none placeholder:italic placeholder:text-muted-foreground/60 sm:text-6xl lg:text-7xl'
            defaultValue={query}
            id='search-page-query'
            name='q'
            placeholder='What are you looking for?'
            type='search'
          />
          <button
            className='shrink-0 pb-2 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary'
            type='submit'
          >
            Search <span aria-hidden>→</span>
          </button>
        </div>
      </form>
      <p className='mt-4 text-sm text-muted-foreground'>
        Searches titles, excerpts, and full article text.
      </p>
    </header>
  );
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const queryValue = (await searchParams).q;
  const query = (
    Array.isArray(queryValue) ? queryValue[0] : queryValue || ''
  ).trim();
  const articles = query ? await searchPublishedArticles(query) : [];

  return (
    <>
      <BigSearch query={query} />

      {!query ? (
        <div className='mt-14 grid gap-8 lg:grid-cols-12'>
          <p className='font-heading text-2xl italic leading-9 text-muted-foreground lg:col-span-7'>
            Enter a topic, a case, or a phrase you remember. Every published
            piece in the journal is searchable.
          </p>
          <div className='lg:col-span-4 lg:col-start-9 lg:border-l lg:border-border lg:pl-6'>
            <p className='text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground'>
              Or browse
            </p>
            <ul className='mt-3 space-y-2 font-heading text-xl'>
              <li>
                <Link
                  className='text-foreground hover:text-primary'
                  href='/articles'
                >
                  All articles →
                </Link>
              </li>
              <li>
                <Link
                  className='text-foreground hover:text-primary'
                  href='/categories'
                >
                  Categories →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : articles.length ? (
        <section aria-label={`Search results for ${query}`} className='mt-10'>
          <div className='mb-10 flex items-baseline gap-4'>
            <p className='font-heading text-6xl leading-none text-primary'>
              {articles.length}
            </p>
            <p className='text-sm text-muted-foreground'>
              {articles.length === 1 ? 'piece mentions' : 'pieces mention'}{' '}
              <span className='font-heading text-lg italic text-foreground'>
                “{query}”
              </span>
            </p>
            <span aria-hidden className='h-px flex-1 bg-border' />
          </div>
          <div className='grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3'>
            {articles.map((article, i) => (
              <ArticleCard article={article} index={i + 1} key={article.id} />
            ))}
          </div>
        </section>
      ) : (
        <div className='mx-auto mt-16 max-w-xl text-center'>
          <p aria-hidden className='font-heading text-5xl text-primary/60'>
            ∅
          </p>
          <h2 className='mt-4 font-heading text-3xl italic text-foreground'>
            Nothing yet for “{query}”.
          </h2>
          <p className='mt-3 text-sm leading-6 text-muted-foreground'>
            Try a broader word, check the spelling, or{' '}
            <Link
              className='text-primary underline underline-offset-4'
              href='/articles'
            >
              browse all articles
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
}

function SearchFallback() {
  return (
    <div aria-label='Loading search' className='space-y-10' role='status'>
      <div className='h-3 w-40 animate-pulse bg-muted' />
      <div className='h-20 w-full animate-pulse bg-muted' />
      <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }, (_, i) => (
          <div className='aspect-[3/2] animate-pulse bg-muted' key={i} />
        ))}
      </div>
    </div>
  );
}
