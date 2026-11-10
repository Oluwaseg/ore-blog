'use client';

import { submitStoryAction } from '@/actions/stories';
import {
  inputClassName,
  labelClassName,
  primaryButtonClassName,
  textareaClassName,
} from '@/components/admin/styles';
import { ActionToast } from '@/components/ui/action-toast';
import { useActionState } from 'react';

export function StorySubmissionForm() {
  const [state, formAction, pending] = useActionState(submitStoryAction, null);

  return (
    <form action={formAction} className='flex flex-col gap-5'>
      <ActionToast state={state} />
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='story-title'>
          Title
        </label>
        <input
          className={inputClassName}
          id='story-title'
          name='title'
          maxLength={160}
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='story-content'>
          Your story
        </label>
        <textarea
          className={textareaClassName}
          id='story-content'
          name='story'
          minLength={100}
          maxLength={20000}
          required
          rows={10}
        />
      </div>
      <fieldset className='flex flex-col gap-3'>
        <legend className={labelClassName}>
          How would you like to be identified?
        </legend>
        <label className='flex items-center gap-2 text-sm'>
          <input defaultChecked name='anonymous' type='radio' value='no' />
          Use my name
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <input name='anonymous' type='radio' value='yes' />
          Keep my identity anonymous if considered for publication
        </label>
      </fieldset>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='story-name'>
          Name{' '}
          <span className='font-normal text-muted-foreground'>
            (optional if anonymous)
          </span>
        </label>
        <input
          className={inputClassName}
          id='story-name'
          name='name'
          maxLength={100}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='story-email'>
          Email{' '}
          <span className='font-normal text-muted-foreground'>
            (private, optional)
          </span>
        </label>
        <input
          className={inputClassName}
          id='story-email'
          name='email'
          type='email'
        />
      </div>
      <label className='flex items-start gap-3 text-sm leading-6'>
        <input
          className='mt-1'
          name='consentToReview'
          type='checkbox'
          value='yes'
          required
        />
        <span>
          I understand this submission will be read privately by the editorial
          team and will not be published without further editorial review and
          consent.
        </span>
      </label>
      <input
        autoComplete='off'
        className='hidden'
        name='company'
        tabIndex={-1}
      />
      <button
        className={primaryButtonClassName}
        disabled={pending}
        type='submit'
      >
        {pending ? 'Sending…' : 'Submit for review'}
      </button>
      <p className='text-xs leading-5 text-muted-foreground'>
        Please avoid including names or identifying details about other people
        unless they have agreed. Do not use this form for urgent help; it is not
        an emergency service.
      </p>
    </form>
  );
}
