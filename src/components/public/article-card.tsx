import { formatDate, plainText } from '@/lib/plain-text';
import Link from 'next/link';

type ArticleCardArticle = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  publishedAt: Date | null;
  categories: { category: { name: string; slug: string } }[];
};

export function ArticleCard({ article }: { article: ArticleCardArticle }) {
  const summary = article.excerpt || plainText(article.content);

  return (
    <article className='flex flex-col gap-3 border-b border-border pb-6'>
      {article.featuredImage ? (
        <Link href={`/articles/${article.slug}`}>
          <img
            alt={article.title}
            className='aspect-[3/2] w-full rounded-md object-cover'
            src={article.featuredImage}
          />
        </Link>
      ) : null}
      <div className='flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wide text-muted-foreground'>
        {article.categories.map((item) => (
          <Link
            className='hover:text-primary'
            href={`/categories/${item.category.slug}`}
            key={item.category.slug}
          >
            {item.category.name}
          </Link>
        ))}
      </div>
      <h2 className='font-heading text-2xl leading-tight text-foreground'>
        <Link
          className='decoration-primary/40 underline-offset-4 hover:underline'
          href={`/articles/${article.slug}`}
        >
          {article.title}
        </Link>
      </h2>
      {article.publishedAt ? (
        <time
          className='font-mono text-xs text-muted-foreground'
          dateTime={article.publishedAt.toISOString()}
        >
          {formatDate(article.publishedAt)}
        </time>
      ) : null}
      {summary ? (
        <p className='text-sm leading-6 text-muted-foreground'>{summary}</p>
      ) : null}
    </article>
  );
}
