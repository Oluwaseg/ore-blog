'use client';

import { savePublicationSettingsAction } from '@/actions/settings';
import {
  inputClassName,
  labelClassName,
  primaryButtonClassName,
  textareaClassName,
} from '@/components/admin/styles';
import { ActionToast } from '@/components/ui/action-toast';
import { useActionState, useState } from 'react';
import { toast } from 'sonner';

type PublicationSettingsValues = {
  publicationName: string;
  tagline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  logoUrl: string;
  instagramUrl: string;
};

export function PublicationSettingsForm({
  settings,
}: {
  settings: PublicationSettingsValues;
}) {
  const [state, formAction, pending] = useActionState(
    savePublicationSettingsAction,
    null
  );
  const [logoUrl, setLogoUrl] = useState(() => settings.logoUrl ?? '');

  async function handleLogoUpload(file?: File) {
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      toast.error('Choose a PNG, JPEG, or WebP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Choose an image smaller than 10 MB.');
      return;
    }

    try {
      const source = URL.createObjectURL(file);
      const image = new Image();
      image.src = source;
      await image.decode();
      URL.revokeObjectURL(source);

      const scale = Math.min(1, 1000 / image.width, 400 / image.height);
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Image processing is unavailable.');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const optimized = canvas.toDataURL('image/webp', 0.82);
      if (optimized.length > 700_000) {
        throw new Error(
          'Logo is still too large after optimization. Try a simpler image.'
        );
      }

      setLogoUrl(optimized);
      toast.success('Logo uploaded. Save publication settings to apply it.');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Could not process this image.'
      );
    }
  }

  return (
    <form action={formAction} className='flex flex-col gap-5'>
      <ActionToast state={state} />
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='publication-name'>
          Publication name
        </label>
        <input
          className={inputClassName}
          defaultValue={settings.publicationName}
          id='publication-name'
          name='publicationName'
          required
        />
      </div>
      <div className='flex flex-col gap-3'>
        <label className={labelClassName} htmlFor='publication-logo-url'>
          Logo image
        </label>
        <input
          className={inputClassName}
          id='publication-logo-url'
          name='logoUrl'
          onChange={(event) => setLogoUrl(event.target.value)}
          placeholder='https://example.com/logo.png or upload an image below'
          value={logoUrl ?? ''}
        />
        <label className='flex w-fit cursor-pointer items-center justify-center rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary'>
          Upload image
          <input
            accept='image/png,image/jpeg,image/webp'
            className='sr-only'
            onChange={(event) => {
              void handleLogoUpload(event.target.files?.[0]);
              event.target.value = '';
            }}
            type='file'
          />
        </label>
        {logoUrl ? (
          <div className='flex items-center gap-4'>
            <img
              alt='Publication logo preview'
              className='max-h-20 max-w-56 rounded border border-border object-contain p-2'
              src={logoUrl}
            />
            <button
              className='text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline'
              onClick={() => setLogoUrl('')}
              type='button'
            >
              Remove logo
            </button>
          </div>
        ) : (
          <p className='text-xs text-muted-foreground'>
            Optional. Uploads are optimized as WebP and stored with publication
            settings.
          </p>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='publication-tagline'>
          Tagline
        </label>
        <input
          className={inputClassName}
          defaultValue={settings.tagline}
          id='publication-tagline'
          name='tagline'
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='publication-description'>
          Description
        </label>
        <textarea
          className={textareaClassName}
          defaultValue={settings.description}
          id='publication-description'
          name='description'
          required
          rows={4}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='publication-instagram'>
          Instagram URL
        </label>
        <input
          className={inputClassName}
          defaultValue={settings.instagramUrl}
          id='publication-instagram'
          name='instagramUrl'
          placeholder='https://www.instagram.com/your-handle'
          type='url'
        />
      </div>
      <div className='border-t border-border pt-5'>
        <h3 className='text-sm font-semibold'>Search metadata</h3>
        <p className='mt-1 text-sm text-muted-foreground'>
          Used as the default title and description for public pages.
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <label className={labelClassName} htmlFor='publication-meta-title'>
          Default meta title
        </label>
        <input
          className={inputClassName}
          defaultValue={settings.metaTitle}
          id='publication-meta-title'
          name='metaTitle'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label
          className={labelClassName}
          htmlFor='publication-meta-description'
        >
          Default meta description
        </label>
        <textarea
          className={textareaClassName}
          defaultValue={settings.metaDescription}
          id='publication-meta-description'
          name='metaDescription'
          rows={3}
        />
      </div>
      <button
        className={primaryButtonClassName}
        disabled={pending}
        type='submit'
      >
        {pending ? 'Saving…' : 'Save publication settings'}
      </button>
    </form>
  );
}
