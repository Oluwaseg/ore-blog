'use client';

import { secondaryButtonClassName } from '@/components/admin/styles';
import { toast } from 'sonner';

export function ConfirmActionButton({
  action,
  label,
  message,
  successMessage,
}: {
  action: () => Promise<void>;
  label: string;
  message: string;
  successMessage?: string;
}) {
  return (
    <form
      action={async () => {
        if (!window.confirm(message)) {
          return;
        }

        try {
          await action();
          toast.success(successMessage ?? `${label} completed.`);
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : `Could not ${label.toLowerCase()}.`
          );
        }
      }}
    >
      <button className={secondaryButtonClassName} type='submit'>
        {label}
      </button>
    </form>
  );
}
