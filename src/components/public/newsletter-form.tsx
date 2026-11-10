'use client';

import { subscribeNewsletterAction } from '@/actions/engagement';
import { useActionState } from 'react';

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletterAction,
    null
  );

  return (
    <form action={formAction} className='flex flex-col gap-3'>
      <label className='sr-only' htmlFor='newsletter-email'>
        Email
      </label>
      <div className='flex gap-2'>
        <input
          className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring'
          id='newsletter-email'
          name='email'
          placeholder='you@example.com'
          required
          type='email'
        />
        <button
          className='h-10 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70'
          disabled={pending}
          type='submit'
        >
          {pending ? 'Saving...' : 'Subscribe'}
        </button>
      </div>
      <input
        autoComplete='off'
        className='hidden'
        name='company'
        tabIndex={-1}
      />
      {state?.error ? (
        <p className='text-sm text-destructive' role='alert'>
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className='text-sm text-chart-4'>{state.success}</p>
      ) : null}
    </form>
  );
}
