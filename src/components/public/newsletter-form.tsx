'use client';

import { subscribeNewsletterAction } from '@/actions/engagement';
import { ActionToast } from '@/components/ui/action-toast';
import { useActionState } from 'react';

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletterAction,
    null
  );

  return (
    <form action={formAction} className='flex flex-col gap-3'>
      <ActionToast state={state} />
      <label className='sr-only' htmlFor='newsletter-email'>
        Email
      </label>
      <div className='flex items-center gap-3 border-b border-foreground/60 transition-colors focus-within:border-primary'>
        <input
          className='h-12 w-full bg-transparent font-heading text-xl text-foreground outline-none placeholder:italic'
          id='newsletter-email'
          name='email'
          placeholder='you@example.com'
          required
          type='email'
        />
        <button
          className='h-12 shrink-0 text-[0.6875rem] uppercase tracking-[0.2em] text-primary transition-colors hover:text-foreground disabled:opacity-60'
          disabled={pending}
          type='submit'
        >
          {pending ? 'Saving…' : 'Subscribe →'}
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
        <p className='font-heading text-base italic text-primary'>
          {state.success}
        </p>
      ) : null}
    </form>
  );
}
