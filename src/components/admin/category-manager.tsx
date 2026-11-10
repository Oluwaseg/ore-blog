'use client';

import { deleteCategoryAction } from '@/actions/categories';
import { CategoryForm } from '@/components/admin/category-form';
import { ConfirmActionButton } from '@/components/admin/confirm-action-button';
import { primaryButtonClassName } from '@/components/admin/styles';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  articleCount: number;
};

export function CategoryManager({ categories }: { categories: CategoryRow[] }) {
  const [dialogCategory, setDialogCategory] = useState<
    CategoryRow | 'new' | null
  >(null);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <p className='text-sm text-muted-foreground'>
          {categories.length}{' '}
          {categories.length === 1 ? 'category' : 'categories'}
        </p>
        <button
          className={primaryButtonClassName}
          onClick={() => setDialogCategory('new')}
          type='button'
        >
          <Plus aria-hidden='true' className='mr-2' size={16} />
          New category
        </button>
      </div>

      {categories.length === 0 ? (
        <p className='rounded-md border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground'>
          No categories yet. Create one to organize your articles.
        </p>
      ) : (
        <div className='overflow-x-auto rounded-md border border-border bg-card'>
          <table className='w-full min-w-160 text-left text-sm'>
            <thead className='border-b border-border bg-muted'>
              <tr>
                <th className='px-4 py-3 font-medium'>Name</th>
                <th className='px-4 py-3 font-medium'>Slug</th>
                <th className='px-4 py-3 font-medium'>Articles</th>
                <th className='px-4 py-3 font-medium'>Description</th>
                <th className='px-4 py-3 text-right font-medium'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  className='border-b border-border last:border-0'
                  key={category.id}
                >
                  <td className='px-4 py-3 font-medium'>{category.name}</td>
                  <td className='px-4 py-3 font-mono text-xs text-muted-foreground'>
                    /{category.slug}
                  </td>
                  <td className='px-4 py-3'>{category.articleCount}</td>
                  <td className='max-w-72 px-4 py-3 text-muted-foreground'>
                    <span className='block truncate'>
                      {category.description || '—'}
                    </span>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex justify-end gap-2'>
                      <button
                        aria-label={`Edit ${category.name}`}
                        className='inline-flex h-9 items-center justify-center rounded-md border border-border px-3 text-sm font-medium transition-colors hover:bg-secondary'
                        onClick={() => setDialogCategory(category)}
                        title='Edit category'
                        type='button'
                      >
                        Edit
                      </button>
                      <ConfirmActionButton
                        action={deleteCategoryAction.bind(null, category.id)}
                        label='Delete'
                        message={`Delete “${category.name}”? Articles will remain, but will no longer be assigned to this category.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {dialogCategory ? (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/40 p-4'
          onClick={(event) => {
            if (event.target === event.currentTarget) setDialogCategory(null);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setDialogCategory(null);
          }}
          role='presentation'
        >
          <section
            aria-labelledby='category-dialog-title'
            aria-modal='true'
            className='my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-md border border-border bg-card p-6 text-card-foreground shadow-xl'
            role='dialog'
          >
            <div className='mb-6 flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
                  Category management
                </p>
                <h2
                  className='mt-2 text-xl font-semibold'
                  id='category-dialog-title'
                >
                  {dialogCategory === 'new'
                    ? 'Create category'
                    : `Edit ${dialogCategory.name}`}
                </h2>
              </div>
              <button
                aria-label='Close category dialog'
                className='inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
                onClick={() => setDialogCategory(null)}
                type='button'
              >
                <X aria-hidden='true' size={18} />
              </button>
            </div>
            <CategoryForm
              category={
                dialogCategory === 'new'
                  ? undefined
                  : {
                      ...dialogCategory,
                      description: dialogCategory.description ?? '',
                    }
              }
              onSaved={() => setDialogCategory(null)}
            />
          </section>
        </div>
      ) : null}
    </div>
  );
}
