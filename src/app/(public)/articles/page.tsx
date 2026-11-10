import { ArticleCard } from '@/components/public/article-card';
import { listPublishedArticles } from '@/features/articles/public';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Read published articles and perspectives.',
};

export default async function ArticlesPage() {
  const articles = await listPublishedArticles();

  return (
    <div className='space-y-10'>
      <header className='max-w-3xl border-b border-border pb-8'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          The journal
        </p>
        <h1 className='mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          Articles
        </h1>
        <p className='mt-4 text-base leading-7 text-muted-foreground'>
          Reporting, essays, and perspectives on awareness, education, and
          community care.
        </p>
      </header>

      {articles.length ? (
        <section
          aria-label='Published articles'
          className='grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'
        >
          {articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </section>
      ) : (
        <div className='border-l-2 border-primary/40 py-2 pl-5'>
          <h2 className='font-heading text-2xl text-foreground'>
            The journal is taking shape.
          </h2>
          <p className='mt-2 max-w-xl text-sm leading-6 text-muted-foreground'>
            Published stories will appear here. Please check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
