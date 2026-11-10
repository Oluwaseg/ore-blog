import { deleteCommentAction } from '@/actions/comments';
import { ConfirmActionButton } from '@/components/admin/confirm-action-button';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Comments',
};

export default function AdminCommentsPage() {
  return (
    <main className='flex flex-col gap-6'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>Comments</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Review reader comments and remove content that does not belong.
        </p>
      </header>
      <Suspense fallback={<CommentsFallback />}>
        <CommentsList />
      </Suspense>
    </main>
  );
}

async function CommentsList() {
  const comments = await db.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      article: {
        select: { title: true, slug: true },
      },
    },
  });

  return (
    <>
      {comments.length === 0 ? (
        <p className='text-sm text-muted-foreground'>
          No comments have been submitted.
        </p>
      ) : (
        <div className='overflow-x-auto rounded-md border border-border bg-card'>
          <table className='w-full min-w-3xl text-left text-sm'>
            <thead className='border-b border-border bg-muted'>
              <tr>
                <th className='px-4 py-3 font-medium'>Comment</th>
                <th className='px-4 py-3 font-medium'>Article</th>
                <th className='px-4 py-3 font-medium'>Submitted</th>
                <th className='px-4 py-3 font-medium'>
                  <span className='sr-only'>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr
                  className='border-b border-border last:border-0'
                  key={comment.id}
                >
                  <td className='max-w-lg px-4 py-4 align-top'>
                    <p className='whitespace-pre-wrap wrap-break-word text-foreground'>
                      {comment.content}
                    </p>
                    <p className='mt-2 text-xs text-muted-foreground'>
                      {comment.displayName || comment.username || 'Reader'}
                      {comment.email ? ` · ${comment.email}` : ''}
                    </p>
                  </td>
                  <td className='px-4 py-4 align-top'>
                    <Link
                      className='font-medium text-primary underline-offset-4 hover:underline'
                      href={`/articles/${comment.article.slug}`}
                    >
                      {comment.article.title}
                    </Link>
                  </td>
                  <td className='whitespace-nowrap px-4 py-4 align-top font-mono text-xs text-muted-foreground'>
                    <time dateTime={comment.createdAt.toISOString()}>
                      {comment.createdAt.toLocaleDateString()}
                    </time>
                  </td>
                  <td className='px-4 py-4 align-top'>
                    <ConfirmActionButton
                      action={deleteCommentAction.bind(null, comment.id)}
                      label='Delete'
                      message='Delete this comment? This cannot be undone.'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function CommentsFallback() {
  return (
    <div
      aria-label='Loading comments'
      className='overflow-hidden rounded-md border border-border bg-card'
      role='status'
    >
      <div className='h-11 border-b border-border bg-muted' />
      {Array.from({ length: 4 }, (_, index) => (
        <div
          className='flex min-h-24 items-center gap-6 border-b border-border px-4 py-4 last:border-0'
          key={index}
        >
          <div className='h-5 flex-1 animate-pulse rounded bg-muted' />
          <div className='h-5 w-32 animate-pulse rounded bg-muted' />
          <div className='h-5 w-24 animate-pulse rounded bg-muted' />
        </div>
      ))}
    </div>
  );
}
