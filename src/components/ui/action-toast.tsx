'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

type ActionToastState = {
  error?: string;
  success?: string | boolean;
} | null;

export function ActionToast({
  state,
  successMessage = 'Changes saved.',
}: {
  state: ActionToastState;
  successMessage?: string;
}) {
  const lastNotifiedState = useRef<ActionToastState>(null);

  useEffect(() => {
    if (!state || lastNotifiedState.current === state) {
      return;
    }

    lastNotifiedState.current = state;

    if (state?.error) {
      toast.error(state.error);
      return;
    }

    if (state?.success) {
      toast.success(
        typeof state.success === 'string' ? state.success : successMessage
      );
    }
  }, [state, successMessage]);

  return null;
}
