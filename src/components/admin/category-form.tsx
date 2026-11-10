'use client';

import { saveCategoryAction } from '@/actions/categories';
import {
  inputClassName,
  labelClassName,
  primaryButtonClassName,
  textareaClassName,
} from '@/components/admin/styles';
import { ActionToast } from '@/components/ui/action-toast';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

type CategoryFormValues = {
  id?: string;
  name: string;
  slug: string;
  description: string;
};

export function CategoryForm({
  category,
  onSaved,
}: {
  category?: CategoryFormValues;
  onSaved?: () => void;
}) {
  const action = saveCategoryAction.bind(null, category?.id ?? null);
  const [state, formAction, pending] = useActionState(action, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.refresh();
      onSaved?.();
    }
  }, [onSaved, router, state?.success]);

  return (
    <form action={formAction} className='flex flex-col gap-4'>
      <ActionToast
        state={state}
        successMessage={category ? 'Category updated.' : 'Category created.'}
      />
      <div className='flex flex-col gap-2'>
        <label
          className={labelClassName}
          htmlFor={`name-${category?.id ?? 'new'}`}
        >
          Name
        </label>
        <input
          className={inputClassName}
          defaultValue={category?.name}
          id={`name-${category?.id ?? 'new'}`}
          name='name'
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label
          className={labelClassName}
          htmlFor={`slug-${category?.id ?? 'new'}`}
        >
          Slug
        </label>
        <input
          className={inputClassName}
          defaultValue={category?.slug}
          id={`slug-${category?.id ?? 'new'}`}
          name='slug'
          placeholder='Generated from the name if left blank'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label
          className={labelClassName}
          htmlFor={`description-${category?.id ?? 'new'}`}
        >
          Description
        </label>
        <textarea
          className={textareaClassName}
          defaultValue={category?.description}
          id={`description-${category?.id ?? 'new'}`}
          name='description'
          rows={3}
        />
      </div>
      {state?.error ? (
        <p className='text-sm text-destructive' role='alert'>
          {state.error}
        </p>
      ) : null}
      <button
        className={primaryButtonClassName}
        disabled={pending}
        type='submit'
      >
        {pending
          ? 'Saving...'
          : category
            ? 'Update category'
            : 'Create category'}
      </button>
    </form>
  );
}
