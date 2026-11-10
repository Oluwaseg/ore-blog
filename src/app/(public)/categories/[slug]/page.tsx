import { ArticleCard } from '@/components/public/article-card';
import { getCategoryBySlug } from '@/features/articles/public';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
      }
    : { title: 'Category not found' };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
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
