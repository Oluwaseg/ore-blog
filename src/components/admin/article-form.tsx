'use client';

import { saveArticleAction } from '@/actions/articles';
import { ArticleEditor } from '@/components/admin/article-editor';
import {
  inputClassName,
  labelClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
  textareaClassName,
} from '@/components/admin/styles';
import { ActionToast } from '@/components/ui/action-toast';
import { toDateTimeLocalValue } from '@/lib/slug';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

type CategoryOption = {
  id: string;
  name: string;
};

type ArticleFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  contentWarning: string;
  content: string;
  featuredImage: string;
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
  scheduledAt: Date | null;
  metaTitle: string;
  metaDescription: string;
  categoryIds: string[];
  tags: string;
};

export function ArticleForm({
  article,
  categories,
}: {
  article?: ArticleFormValues;
  categories: CategoryOption[];
}) {
  const action = saveArticleAction.bind(null, article?.id ?? null);
  const [state, formAction, pending] = useActionState(action, null);
  const [status, setStatus] = useState(article?.status ?? 'DRAFT');
  const router = useRouter();

  useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [router, state?.redirectTo]);

  return (
    <form action={formAction} className='flex flex-col gap-6'>
      <ActionToast state={state} />
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='title'>
          Title
        </label>
        <input
          className={inputClassName}
          defaultValue={article?.title}
          id='title'
          name='title'
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='slug'>
          Slug
        </label>
        <input
          className={inputClassName}
          defaultValue={article?.slug}
          id='slug'
          name='slug'
          placeholder='Generated from the title if left blank'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='excerpt'>
          Excerpt
        </label>
        <textarea
          className={textareaClassName}
          defaultValue={article?.excerpt}
          id='excerpt'
          name='excerpt'
          rows={3}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='contentWarning'>
          Content warning (optional)
        </label>
        <input
          className={inputClassName}
          defaultValue={article?.contentWarning}
          id='contentWarning'
          maxLength={180}
          name='contentWarning'
          placeholder='For example: discussion of sexual violence'
        />
        <p className='text-xs text-muted-foreground'>
          Shown before the article so readers can choose whether to continue.
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <span className={labelClassName}>Content</span>
        <ArticleEditor defaultValue={article?.content} name='content' />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='featuredImage'>
          Featured image URL
        </label>
        <input
          className={inputClassName}
          defaultValue={article?.featuredImage}
          id='featuredImage'
          name='featuredImage'
          placeholder='https://'
          type='url'
        />
      </div>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <label className={labelClassName} htmlFor='status'>
            Status
          </label>
          <select
            className={inputClassName}
            id='status'
            name='status'
            onChange={(event) =>
              setStatus(event.target.value as ArticleFormValues['status'])
            }
            value={status}
          >
            <option value='DRAFT'>Draft</option>
            <option value='SCHEDULED'>Scheduled</option>
            <option value='PUBLISHED'>Published</option>
            <option value='ARCHIVED'>Archived</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label className={labelClassName} htmlFor='scheduledAt'>
            Schedule for
          </label>
          <input
            className={inputClassName}
            defaultValue={
              article?.scheduledAt
                ? toDateTimeLocalValue(article.scheduledAt)
                : ''
            }
            id='scheduledAt'
            name='scheduledAt'
            type='datetime-local'
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='metaTitle'>
          SEO title
        </label>
        <input
          className={inputClassName}
          defaultValue={article?.metaTitle}
          id='metaTitle'
          name='metaTitle'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='metaDescription'>
          SEO description
        </label>
        <textarea
          className={textareaClassName}
          defaultValue={article?.metaDescription}
          id='metaDescription'
          name='metaDescription'
          rows={3}
        />
      </div>
      <fieldset className='flex flex-col gap-2'>
        <legend className={labelClassName}>Categories</legend>
        {categories.length === 0 ? (
          <p className='text-sm text-muted-foreground'>
            Create a category first.
          </p>
        ) : (
          <div className='flex flex-col gap-2'>
            {categories.map((category) => (
              <label
                className='flex items-center gap-2 text-sm'
                key={category.id}
              >
                <input
                  defaultChecked={article?.categoryIds.includes(category.id)}
                  name='categoryIds'
                  type='checkbox'
                  value={category.id}
                />
                {category.name}
              </label>
            ))}
          </div>
        )}
      </fieldset>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='tags'>
          Tags
        </label>
        <input
          className={inputClassName}
          defaultValue={article?.tags}
          id='tags'
          name='tags'
          placeholder='Comma-separated'
        />
      </div>
      {state?.error ? (
        <p className='text-sm text-destructive' role='alert'>
          {state.error}
        </p>
      ) : null}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
        <button
          className={primaryButtonClassName}
          disabled={pending}
          type='submit'
        >
          {pending ? 'Saving...' : 'Save article'}
        </button>
        <Link className={secondaryButtonClassName} href='/admin/articles'>
          Cancel
        </Link>
      </div>
    </form>
  );
}
