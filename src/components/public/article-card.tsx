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
  const category = article.categories[0]?.category;

  return (
    <article className='group flex flex-col gap-3'>
      {article.featuredImage ? (
        <Link
          className='block overflow-hidden bg-muted'
          href={`/articles/${article.slug}`}
          tabIndex={-1}
        >
          <img
            alt={article.title}
            className='aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]'
            src={article.featuredImage}
          />
        </Link>
      ) : null}
      <div className='flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground'>
        {category ? (
          <Link
            className='text-primary hover:underline'
            href={`/categories/${category.slug}`}
          >
            {category.name}
          </Link>
        ) : null}
        {category && article.publishedAt ? <span aria-hidden>·</span> : null}
        {article.publishedAt ? (
          <time dateTime={article.publishedAt.toISOString()}>
            {formatDate(article.publishedAt)}
          </time>
        ) : null}
      </div>
      <h2 className='font-heading text-xl leading-snug text-foreground'>
        <Link
          className='decoration-primary/40 underline-offset-4 group-hover:underline'
          href={`/articles/${article.slug}`}
        >
          {article.title}
        </Link>
      </h2>
      {summary ? (
        <p className='line-clamp-2 text-sm leading-6 text-muted-foreground'>
          {summary}
        </p>
      ) : null}
    </article>
  );
}
