'use client';

import { addCommentAction } from '@/actions/engagement';
import {
  inputClassName,
  labelClassName,
  primaryButtonClassName,
  textareaClassName,
} from '@/components/admin/styles';
import { useActionState } from 'react';

export function CommentForm({ articleId }: { articleId: string }) {
  const [state, formAction, pending] = useActionState(addCommentAction, null);

  return (
    <form action={formAction} className='flex flex-col gap-4'>
      <input name='articleId' type='hidden' value={articleId} />
      <input
        autoComplete='off'
        className='hidden'
        name='company'
        tabIndex={-1}
      />
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <label className={labelClassName} htmlFor='displayName'>
            Display name
          </label>
          <input
            className={inputClassName}
            id='displayName'
            name='displayName'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className={labelClassName} htmlFor='username'>
            Username
          </label>
          <input className={inputClassName} id='username' name='username' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='comment-email'>
          Email{' '}
          <span className='font-normal text-muted-foreground'>(private)</span>
        </label>
        <input
          className={inputClassName}
          id='comment-email'
          name='email'
          type='email'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='comment-content'>
          Comment
        </label>
        <textarea
          className={textareaClassName}
          id='comment-content'
          name='content'
          required
          rows={5}
        />
      </div>
      {state?.error ? (
        <p className='text-sm text-destructive' role='alert'>
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className='text-sm text-chart-4'>{state.success}</p>
      ) : null}
      <button
        className={primaryButtonClassName}
        disabled={pending}
        type='submit'
      >
        {pending ? 'Publishing...' : 'Publish comment'}
      </button>
    </form>
  );
}
