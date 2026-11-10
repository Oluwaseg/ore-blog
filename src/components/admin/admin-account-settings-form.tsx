'use client';

import { updateAdminAccountAction } from '@/actions/settings';
import {
  inputClassName,
  labelClassName,
  primaryButtonClassName,
} from '@/components/admin/styles';
import { ActionToast } from '@/components/ui/action-toast';
import { useActionState } from 'react';

export function AdminAccountSettingsForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(
    updateAdminAccountAction,
    null
  );

  return (
    <form action={formAction} className='flex flex-col gap-5'>
      <ActionToast state={state} />
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='admin-account-email'>
          Admin email
        </label>
        <input
          autoComplete='email'
          className={inputClassName}
          defaultValue={email}
          id='admin-account-email'
          name='email'
          required
          type='email'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='admin-current-password'>
          Current password
        </label>
        <input
          autoComplete='current-password'
          className={inputClassName}
          id='admin-current-password'
          name='currentPassword'
          required
          type='password'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='admin-new-password'>
          New password
        </label>
        <input
          autoComplete='new-password'
          className={inputClassName}
          id='admin-new-password'
          name='newPassword'
          minLength={12}
          type='password'
        />
        <p className='text-xs text-muted-foreground'>
          Leave blank to keep your current password. If set, use at least 12
          characters.
        </p>
      </div>
      <button
        className={primaryButtonClassName}
        disabled={pending}
        type='submit'
      >
        {pending ? 'Updating…' : 'Update admin account'}
      </button>
    </form>
  );
}
