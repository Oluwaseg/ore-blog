import { ArticleCard } from '@/components/public/article-card';
import { SearchForm } from '@/components/public/search-form';
import { searchPublishedArticles } from '@/features/articles/public';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search published articles.',
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const queryValue = (await searchParams).q;
  const query = (
    Array.isArray(queryValue) ? queryValue[0] : queryValue || ''
  ).trim();
  const articles = query ? await searchPublishedArticles(query) : [];

  return (
    <div className='space-y-10'>
      <header className='max-w-3xl border-b border-border pb-8'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          The journal
        </p>
        <h1 className='mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          Search
        </h1>
        <p className='mt-4 text-base leading-7 text-muted-foreground'>
          Find published articles by title, excerpt, or content.
        </p>
        <div className='mt-6 max-w-xl'>
          <SearchForm defaultValue={query} inputId='search-page-query' />
        </div>
      </header>

      {!query ? (
        <p className='text-sm text-muted-foreground'>
          Enter a topic or phrase to search the journal.
        </p>
      ) : articles.length ? (
        <section
          aria-label={`Search results for ${query}`}
          className='space-y-8'
        >
          <p className='text-sm text-muted-foreground'>
            {articles.length} {articles.length === 1 ? 'result' : 'results'} for
            “{query}”
          </p>
          <div className='grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
            {articles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </section>
      ) : (
        <p className='border-l-2 border-primary/40 py-2 pl-5 text-sm text-muted-foreground'>
          No published articles matched “{query}”. Try another search.
        </p>
      )}
    </div>
  );
}
