import { updateContentReportAction } from '@/actions/reports';
import { ConfirmActionButton } from '@/components/admin/confirm-action-button';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'Content reports' };

export default function AdminReportsPage() {
  return (
    <main className='flex flex-col gap-6'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Content reports
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Reader reports are private and reviewed here.
        </p>
      </header>
      <Suspense fallback={<ReportsFallback />}>
        <ReportList />
      </Suspense>
    </main>
  );
}

async function ReportList() {
  const reports = await db.contentReport.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    include: {
      article: { select: { title: true, slug: true } },
      comment: {
        select: {
          content: true,
          article: { select: { title: true, slug: true } },
        },
      },
    },
  });

  if (!reports.length)
    return (
      <p className='text-sm text-muted-foreground'>No reports received.</p>
    );

  return (
    <div className='flex flex-col gap-4'>
      {reports.map((report) => {
        const article = report.article ?? report.comment?.article;
        return (
          <article
            className='rounded-md border border-border bg-card p-5'
            key={report.id}
          >
            <header className='flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3'>
              <div>
                <p className='font-semibold'>
                  {report.reason.replaceAll('_', ' ')}
                </p>
                <p className='mt-1 text-xs text-muted-foreground'>
                  {report.createdAt.toLocaleString()}
                  {report.reporterEmail ? ` · ${report.reporterEmail}` : ''}
                </p>
              </div>
              <span className='rounded-md bg-secondary px-2 py-1 font-mono text-xs'>
                {report.status}
              </span>
            </header>
            {article ? (
              <p className='mt-3 text-sm'>
                Related article:{' '}
                <Link
                  className='text-primary underline-offset-4 hover:underline'
                  href={`/articles/${article.slug}`}
                >
                  {article.title}
                </Link>
              </p>
            ) : null}
            {report.comment ? (
              <blockquote className='mt-3 border-l-2 border-border pl-4 text-sm text-muted-foreground'>
                {report.comment.content}
              </blockquote>
            ) : null}
            {report.details ? (
              <p className='mt-3 whitespace-pre-wrap text-sm leading-6'>
                {report.details}
              </p>
            ) : null}
            {report.status === 'PENDING' ? (
              <div className='mt-4 flex flex-wrap gap-3 border-t border-border pt-4'>
                <ConfirmActionButton
                  action={updateContentReportAction.bind(
                    null,
                    report.id,
                    'RESOLVED'
                  )}
                  label='Resolve'
                  message='Mark this report as reviewed and resolved?'
                  successMessage='Report marked resolved.'
                />
                <ConfirmActionButton
                  action={updateContentReportAction.bind(
                    null,
                    report.id,
                    'DISMISSED'
                  )}
                  label='Dismiss'
                  message='Dismiss this report?'
                  successMessage='Report dismissed.'
                />
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

function ReportsFallback() {
  return (
    <div
      aria-label='Loading reports'
      className='h-64 animate-pulse rounded-md border border-border bg-card'
      role='status'
    />
  );
}
