import { reviewStorySubmissionAction } from '@/actions/stories';
import { ConfirmActionButton } from '@/components/admin/confirm-action-button';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'Story submissions' };

export default function AdminStoriesPage() {
  return (
    <main className='flex flex-col gap-6'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Story submissions
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Private submissions are reviewed here. Approval does not publish a
          story; publication requires a separate editorial process and the
          contributor’s consent.
        </p>
      </header>
      <Suspense fallback={<StoriesFallback />}>
        <SubmissionList />
      </Suspense>
    </main>
  );
}

async function SubmissionList() {
  const submissions = await db.storySubmission.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
  });

  if (submissions.length === 0) {
    return (
      <p className='text-sm text-muted-foreground'>No story submissions yet.</p>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {submissions.map((submission) => (
        <article
          className='rounded-md border border-border bg-card p-5'
          key={submission.id}
        >
          <header className='flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4'>
            <div>
              <h2 className='font-heading text-2xl'>{submission.title}</h2>
              <p className='mt-1 text-xs text-muted-foreground'>
                {submission.anonymous
                  ? 'Anonymous submission'
                  : submission.name || 'Name not supplied'}
                {submission.email ? ` · ${submission.email}` : ''}
                {' · '}
                {submission.createdAt.toLocaleDateString()}
              </p>
            </div>
            <span className='rounded-md bg-secondary px-2 py-1 font-mono text-xs text-secondary-foreground'>
              {submission.status}
            </span>
          </header>
          <p className='whitespace-pre-wrap pt-4 text-sm leading-7 text-foreground'>
            {submission.story}
          </p>
          {submission.status === 'PENDING' ? (
            <div className='mt-5 flex flex-wrap gap-3 border-t border-border pt-4'>
              <ConfirmActionButton
                action={reviewStorySubmissionAction.bind(
                  null,
                  submission.id,
                  'APPROVED'
                )}
                label='Approve for follow-up'
                message='Mark this submission as approved for follow-up? This does not publish it.'
                successMessage='Submission approved for follow-up.'
              />
              <ConfirmActionButton
                action={reviewStorySubmissionAction.bind(
                  null,
                  submission.id,
                  'REJECTED'
                )}
                label='Reject'
                message='Reject this story submission?'
                successMessage='Submission rejected.'
              />
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function StoriesFallback() {
  return (
    <div
      aria-label='Loading story submissions'
      className='h-64 animate-pulse rounded-md border border-border bg-card'
      role='status'
    />
  );
}
