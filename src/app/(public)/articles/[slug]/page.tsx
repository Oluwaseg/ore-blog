import { ArticleViewTracker } from '@/components/public/article-view-tracker';
import { CommentForm } from '@/components/public/comment-form';
import { ContentReportForm } from '@/components/public/content-report-form';
import { LikeButton } from '@/components/public/like-button';
import { ShareButtons } from '@/components/public/share-buttons';
import { getPublishedArticle } from '@/features/articles/public';
import { getVisitorId } from '@/features/engagement/visitor';
import { db } from '@/lib/db';
import { formatDate, plainText } from '@/lib/plain-text';
import { getSiteUrl } from '@/lib/site-url';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    return {
      title: 'Article not found',
      robots: { index: false, follow: false },
    };
  }

  const title = article.metaTitle || article.title;
  const description =
    article.metaDescription || article.excerpt || plainText(article.content);
  const url = new URL(`/articles/${article.slug}`, getSiteUrl()).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
    twitter: {
      card: article.featuredImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <Suspense fallback={<ArticleFallback />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: ArticlePageProps) {
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
        <p className='mt-3 text-sm text-muted-foreground'>
          By Beyond the Statute
        </p>
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

      {article.contentWarning ? (
        <aside
          aria-label='Content warning'
          className='mt-8 border-l-2 border-primary bg-accent/50 px-5 py-4'
        >
          <p className='font-mono text-xs uppercase tracking-wide text-accent-foreground'>
            Content warning
          </p>
          <p className='mt-1 text-sm leading-6 text-foreground'>
            {article.contentWarning}
          </p>
        </aside>
      ) : null}

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
      <div className='mt-3'>
        <ContentReportForm articleId={article.id} />
      </div>

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
                <div className='mt-3'>
                  <ContentReportForm commentId={comment.id} />
                </div>
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

function ArticleFallback() {
  return (
    <article
      aria-label='Loading article'
      className='mx-auto w-full max-w-3xl space-y-8'
      role='status'
    >
      <div className='space-y-4 border-b border-border pb-8'>
        <div className='h-4 w-40 animate-pulse rounded bg-muted' />
        <div className='h-12 w-4/5 animate-pulse rounded bg-muted' />
        <div className='h-5 w-3/5 animate-pulse rounded bg-muted' />
      </div>
      <div className='space-y-4'>
        {Array.from({ length: 7 }, (_, index) => (
          <div className='h-4 animate-pulse rounded bg-muted' key={index} />
        ))}
      </div>
    </article>
  );
}
