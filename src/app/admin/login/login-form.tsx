'use client';

import { loginAction } from '@/actions/auth';
import { useActionState } from 'react';

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className='flex w-full flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <label className='text-sm font-medium' htmlFor='email'>
          Email
        </label>
        <input
          autoComplete='email'
          className='h-11 rounded-md border border-input bg-card px-3 text-sm text-card-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring'
          id='email'
          name='email'
          required
          type='email'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-sm font-medium' htmlFor='password'>
          Password
        </label>
        <input
          autoComplete='current-password'
          className='h-11 rounded-md border border-input bg-card px-3 text-sm text-card-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring'
          id='password'
          name='password'
          required
          type='password'
        />
      </div>
      {state?.error ? (
        <p className='text-sm text-destructive' role='alert'>
          {state.error}
        </p>
      ) : null}
      <button
        className='h-11 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70'
        disabled={pending}
        type='submit'
      >
        {pending ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
