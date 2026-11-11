import { formatDate, plainText } from '@/lib/plain-text';
import Link from 'next/link';

export type ArticleCardArticle = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  publishedAt: Date | null;
  categories: { category: { name: string; slug: string } }[];
};

type Variant = 'lead' | 'standard';

export function ArticleCard({
  article,
  index,
  variant = 'standard',
}: {
  article: ArticleCardArticle;
  index?: number;
  variant?: Variant;
}) {
  const summary = article.excerpt || plainText(article.content);
  const href = `/articles/${article.slug}`;
  const isLead = variant === 'lead';

  return (
    <article
      className={
        isLead
          ? 'group grid gap-8 lg:grid-cols-12 lg:gap-12'
          : 'group flex flex-col'
      }
    >
      {article.featuredImage ? (
        <Link
          aria-hidden
          tabIndex={-1}
          className={`block overflow-hidden bg-muted ${isLead ? 'lg:col-span-7' : 'mb-5'}`}
          href={href}
        >
          <img
            alt=''
            className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${isLead ? 'aspect-[4/3] lg:aspect-[5/4]' : 'aspect-[3/2]'}`}
            src={article.featuredImage}
          />
        </Link>
      ) : null}

      <div
        className={
          isLead
            ? `flex flex-col justify-end ${article.featuredImage ? 'lg:col-span-5' : 'lg:col-span-9'}`
            : 'flex flex-1 flex-col'
        }
      >
        <div className='flex items-baseline gap-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground'>
          {typeof index === 'number' ? (
            <span className='font-heading text-sm italic tracking-normal text-primary normal-case'>
              No. {String(index).padStart(2, '0')}
            </span>
          ) : null}
          {article.categories.length ? (
            <span className='flex flex-wrap gap-x-2'>
              {article.categories.map((item, i) => (
                <span key={item.category.slug}>
                  {i > 0 ? <span className='mr-2 text-border'>/</span> : null}
                  <Link
                    className='transition-colors hover:text-primary'
                    href={`/categories/${item.category.slug}`}
                  >
                    {item.category.name}
                  </Link>
                </span>
              ))}
            </span>
          ) : null}
        </div>

        <h2
          className={`mt-3 font-heading text-foreground text-balance ${isLead ? 'text-4xl leading-[1.05] sm:text-5xl lg:text-6xl' : 'text-2xl leading-tight'}`}
        >
          <Link
            className='bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size,color] duration-500 hover:bg-[length:100%_1px] hover:text-primary'
            href={href}
          >
            {article.title}
          </Link>
        </h2>

        {summary ? (
          <p
            className={`mt-4 text-muted-foreground ${isLead ? 'max-w-prose font-heading text-xl italic leading-8' : 'line-clamp-3 text-sm leading-6'}`}
          >
            {summary}
          </p>
        ) : null}

        <div
          className={`flex items-center gap-3 text-xs text-muted-foreground ${isLead ? 'mt-8' : 'mt-auto pt-5'}`}
        >
          {article.publishedAt ? (
            <time
              className='font-mono uppercase tracking-wider'
              dateTime={article.publishedAt.toISOString()}
            >
              {formatDate(article.publishedAt)}
            </time>
          ) : null}
          <span aria-hidden className='h-px flex-1 bg-border' />
          <Link
            className='font-medium text-foreground transition-colors hover:text-primary'
            href={href}
          >
            Read <span aria-hidden>→</span>
            <span className='sr-only'> {article.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
