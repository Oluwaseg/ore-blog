'use client';

import { submitContentReportAction } from '@/actions/reports';
import {
  inputClassName,
  labelClassName,
  secondaryButtonClassName,
  textareaClassName,
} from '@/components/admin/styles';
import { ActionToast } from '@/components/ui/action-toast';
import { useActionState, useState } from 'react';

export function ContentReportForm({
  articleId,
  commentId,
}: {
  articleId?: string;
  commentId?: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitContentReportAction,
    null
  );
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className='text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline'
        onClick={() => setOpen((value) => !value)}
        type='button'
      >
        {open ? 'Cancel report' : 'Report this content'}
      </button>
      {open ? (
        <form
          action={formAction}
          className='mt-3 flex max-w-xl flex-col gap-3 border-l-2 border-primary/40 pl-4'
        >
          <ActionToast state={state} />
          {articleId ? (
            <input name='articleId' type='hidden' value={articleId} />
          ) : null}
          {commentId ? (
            <input name='commentId' type='hidden' value={commentId} />
          ) : null}
          <div className='flex flex-col gap-2'>
            <label
              className={labelClassName}
              htmlFor={`report-reason-${articleId ?? commentId}`}
            >
              Reason
            </label>
            <select
              className={inputClassName}
              id={`report-reason-${articleId ?? commentId}`}
              name='reason'
              required
            >
              <option value=''>Choose a reason</option>
              <option value='harmful_content'>
                Harmful or distressing content
              </option>
              <option value='privacy'>Privacy concern</option>
              <option value='harassment'>Harassment or victim blaming</option>
              <option value='misinformation'>
                Potentially inaccurate information
              </option>
              <option value='other'>Other concern</option>
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label
              className={labelClassName}
              htmlFor={`report-details-${articleId ?? commentId}`}
            >
              Details{' '}
              <span className='font-normal text-muted-foreground'>
                (optional)
              </span>
            </label>
            <textarea
              className={textareaClassName}
              id={`report-details-${articleId ?? commentId}`}
              name='details'
              maxLength={1000}
              rows={3}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label
              className={labelClassName}
              htmlFor={`report-email-${articleId ?? commentId}`}
            >
              Email{' '}
              <span className='font-normal text-muted-foreground'>
                (optional, private)
              </span>
            </label>
            <input
              className={inputClassName}
              id={`report-email-${articleId ?? commentId}`}
              name='email'
              type='email'
            />
          </div>
          <input
            autoComplete='off'
            className='hidden'
            name='company'
            tabIndex={-1}
          />
          <button
            className={secondaryButtonClassName}
            disabled={pending}
            type='submit'
          >
            {pending ? 'Sending…' : 'Send private report'}
          </button>
          <p className='text-xs text-muted-foreground'>
            Reports are reviewed privately and are not displayed publicly.
          </p>
        </form>
      ) : null}
    </div>
  );
}
