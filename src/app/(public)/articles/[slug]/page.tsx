import { ArticleViewTracker } from '@/components/public/article-view-tracker';
import { CommentForm } from '@/components/public/comment-form';
import { LikeButton } from '@/components/public/like-button';
import { ShareButtons } from '@/components/public/share-buttons';
import { getPublishedArticle } from '@/features/articles/public';
import { getVisitorId } from '@/features/engagement/visitor';
import { db } from '@/lib/db';
import { formatDate, plainText } from '@/lib/plain-text';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    return { title: 'Article not found' };
  }

  return {
    title: article.metaTitle || article.title,
    description:
      article.metaDescription || article.excerpt || plainText(article.content),
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    notFound();
  }

  const visitorId = await getVisitorId();
  const existingReaction = visitorId
    ? await db.reaction.findUnique({
        where: {
          articleId_identifier: {
            articleId: article.id,
            identifier: visitorId,
          },
        },
        select: { id: true },
      })
    : null;

  return (
    <article className='mx-auto w-full max-w-3xl pb-12'>
      <ArticleViewTracker articleId={article.id} />
      <nav
        aria-label='Breadcrumb'
        className='mb-8 text-sm text-muted-foreground'
      >
        <Link className='hover:text-primary' href='/articles'>
          Articles
        </Link>
        <span aria-hidden='true' className='px-2'>
          /
        </span>
        <span className='text-foreground'>{article.title}</span>
      </nav>

      <header className='border-b border-border pb-8'>
        <div className='mb-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wide text-muted-foreground'>
          {article.categories.map(({ category }) => (
            <Link
              className='hover:text-primary'
              href={`/categories/${category.slug}`}
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
          {article.publishedAt ? (
            <time dateTime={article.publishedAt.toISOString()}>
              {formatDate(article.publishedAt)}
            </time>
          ) : null}
        </div>
        <h1 className='font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          {article.title}
        </h1>
        {article.excerpt ? (
          <p className='mt-5 text-lg leading-8 text-muted-foreground'>
            {article.excerpt}
          </p>
        ) : null}
        {article.featuredImage ? (
          <img
            alt={article.title}
            className='mt-8 aspect-video w-full rounded-md object-cover'
            src={article.featuredImage}
          />
        ) : null}
      </header>

      <div
        className='article-content'
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.tags.length ? (
        <ul
          aria-label='Tags'
          className='mt-10 flex flex-wrap gap-2 border-t border-border pt-5'
        >
          {article.tags.map(({ tag }) => (
            <li
              className='rounded-md bg-secondary px-3 py-1 text-xs text-secondary-foreground'
              key={tag.id}
            >
              {tag.name}
            </li>
          ))}
        </ul>
      ) : null}

      <section
        aria-label='Article actions'
        className='mt-8 flex flex-col gap-5 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between'
      >
        <LikeButton
          articleId={article.id}
          count={article._count.reactions}
          liked={Boolean(existingReaction)}
        />
        <ShareButtons title={article.title} />
      </section>

      <section aria-labelledby='comments-heading' className='mt-12'>
        <h2
          className='font-heading text-3xl text-foreground'
          id='comments-heading'
        >
          Conversation{' '}
          <span className='text-muted-foreground'>
            ({article.comments.length})
          </span>
        </h2>
        {article.comments.length ? (
          <ol className='mt-6 border-y border-border'>
            {article.comments.map((comment) => (
              <li
                className='border-b border-border py-5 last:border-0'
                key={comment.id}
              >
                <div className='flex flex-wrap items-baseline justify-between gap-2'>
                  <p className='text-sm font-semibold text-foreground'>
                    {comment.displayName || comment.username || 'Reader'}
                  </p>
                  <time
                    className='font-mono text-xs text-muted-foreground'
                    dateTime={comment.createdAt.toISOString()}
                  >
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
                <p className='mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground'>
                  {comment.content}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p className='mt-4 text-sm text-muted-foreground'>
            Be the first to join the conversation.
          </p>
        )}
        <div className='mt-8'>
          <h3 className='mb-4 font-heading text-2xl text-foreground'>
            Leave a comment
          </h3>
          <CommentForm articleId={article.id} />
        </div>
      </section>
    </article>
  );
}
