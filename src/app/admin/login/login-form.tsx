'use client';

import { loginAction } from '@/actions/auth';
import { ActionToast } from '@/components/ui/action-toast';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

const fieldClass =
  'peer h-12 w-full border-0 border-b border-input bg-transparent px-0 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus-visible:ring-0';

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.success) {
      router.push('/admin');
    }
  }, [router, state?.success]);

  return (
    <form action={formAction} className='flex w-full flex-col gap-8'>
      <ActionToast state={state} />

      <div className='group flex flex-col'>
        <label
          className='font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-focus-within:text-primary'
          htmlFor='email'
        >
          Email
        </label>
        <input
          autoComplete='email'
          className={fieldClass}
          id='email'
          name='email'
          placeholder='you@beyondthestatute.com'
          required
          type='email'
        />
      </div>

      <div className='group flex flex-col'>
        <label
          className='font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-focus-within:text-primary'
          htmlFor='password'
        >
          Password
        </label>
        <div className='relative'>
          <input
            autoComplete='current-password'
            className={`${fieldClass} pr-12`}
            id='password'
            name='password'
            required
            type={showPassword ? 'text' : 'password'}
          />
          <button
            aria-controls='password'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className='absolute inset-y-0 right-0 inline-flex w-11 items-center justify-end text-muted-foreground transition-colors hover:text-foreground focus-visible:text-primary focus-visible:outline-none'
            onClick={() => setShowPassword((visible) => !visible)}
            title={showPassword ? 'Hide password' : 'Show password'}
            type='button'
          >
            {showPassword ? (
              <EyeOff aria-hidden='true' size={18} />
            ) : (
              <Eye aria-hidden='true' size={18} />
            )}
          </button>
        </div>
      </div>

      {state?.error ? (
        <p
          className='border-l-2 border-destructive pl-3 text-sm text-destructive'
          role='alert'
        >
          {state.error}
        </p>
      ) : null}

      <button
        className='group mt-2 inline-flex h-12 items-center justify-between bg-primary px-5 text-sm font-medium tracking-wide text-primary-foreground transition-[opacity,padding] hover:pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70'
        disabled={pending}
        type='submit'
      >
        <span>{pending ? 'Signing in...' : 'Sign in'}</span>
        <ArrowRight
          aria-hidden='true'
          className='transition-transform group-hover:translate-x-1'
          size={18}
        />
      </button>
    </form>
  );
}
