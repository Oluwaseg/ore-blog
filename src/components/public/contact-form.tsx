'use client';

import { sendContactAction } from '@/actions/engagement';
import {
  inputClassName,
  labelClassName,
  primaryButtonClassName,
  textareaClassName,
} from '@/components/admin/styles';
import { ActionToast } from '@/components/ui/action-toast';
import { useActionState } from 'react';

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactAction, null);

  return (
    <form action={formAction} className='flex flex-col gap-5'>
      <ActionToast state={state} />
      <div className='grid gap-5 sm:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <label className={labelClassName} htmlFor='contact-name'>
            Name
          </label>
          <input
            className={inputClassName}
            id='contact-name'
            name='name'
            maxLength={80}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className={labelClassName} htmlFor='contact-email'>
            Email
          </label>
          <input
            className={inputClassName}
            id='contact-email'
            name='email'
            type='email'
            required
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='contact-topic'>
          What is your message about?
        </label>
        <select
          className={inputClassName}
          defaultValue='general'
          id='contact-topic'
          name='topic'
        >
          <option value='general'>General enquiry</option>
          <option value='partnership'>Partnership</option>
          <option value='media'>Media enquiry</option>
          <option value='contribution'>Writing contribution</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='contact-organization'>
          Organization{' '}
          <span className='font-normal text-muted-foreground'>(optional)</span>
        </label>
        <input
          className={inputClassName}
          id='contact-organization'
          name='organization'
          maxLength={120}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='contact-message'>
          Message
        </label>
        <textarea
          className={textareaClassName}
          id='contact-message'
          name='message'
          maxLength={2000}
          required
          rows={6}
        />
      </div>
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
        {pending ? 'Sending…' : 'Send message'}
      </button>
      <p className='text-xs leading-5 text-muted-foreground'>
        Please don’t include identifying details about a survivor unless they
        have agreed to share them.
      </p>
    </form>
  );
}
