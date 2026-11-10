import { deleteArticleAction } from '@/actions/articles';
import { ConfirmActionButton } from '@/components/admin/confirm-action-button';
import { primaryButtonClassName } from '@/components/admin/styles';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Articles',
};

export default async function AdminArticlesPage() {
  const articles = await db.article.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      _count: {
        select: { comments: true, views: true },
      },
    },
  });

  return (
    <main className='flex flex-col gap-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>Articles</h1>
          <p className='mt-2 text-sm text-muted-foreground'>
            Create, edit, schedule, and publish editorial content.
          </p>
        </div>
        <Link className={primaryButtonClassName} href='/admin/articles/new'>
          New article
        </Link>
      </div>
      {articles.length === 0 ? (
        <p className='text-sm text-muted-foreground'>No articles yet.</p>
      ) : (
        <div className='overflow-x-auto rounded-md border border-border bg-card'>
          <table className='w-full min-w-[40rem] text-left text-sm'>
            <thead className='border-b border-border bg-muted'>
              <tr>
                <th className='px-4 py-3 font-medium'>Title</th>
                <th className='px-4 py-3 font-medium'>Status</th>
                <th className='px-4 py-3 font-medium'>Updated</th>
                <th className='px-4 py-3 font-medium'>Views</th>
                <th className='px-4 py-3 font-medium'> </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  className='border-b border-border last:border-0'
                  key={article.id}
                >
                  <td className='px-4 py-3'>
                    <Link
                      className='font-medium hover:underline'
                      href={`/admin/articles/${article.id}/edit`}
                    >
                      {article.title}
                    </Link>
                    <p className='text-muted-foreground'>/{article.slug}</p>
                  </td>
                  <td className='px-4 py-3'>{article.status}</td>
                  <td className='px-4 py-3'>
                    {article.updatedAt.toLocaleDateString()}
                  </td>
                  <td className='px-4 py-3'>{article._count.views}</td>
                  <td className='px-4 py-3'>
                    <div className='flex justify-end'>
                      <ConfirmActionButton
                        action={deleteArticleAction.bind(null, article.id)}
                        label='Delete'
                        message='Delete this article and its comments?'
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
