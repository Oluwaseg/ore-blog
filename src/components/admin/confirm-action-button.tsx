"use client";

import { secondaryButtonClassName } from "@/components/admin/styles";

export function ConfirmActionButton({
  action,
  label,
  message,
}: {
  action: () => Promise<void>;
  label: string;
  message: string;
}) {
  return (
    <form
      action={async () => {
        if (!window.confirm(message)) {
          return;
        }

        await action();
      }}
    >
      <button className={secondaryButtonClassName} type="submit">
        {label}
      </button>
    </form>
  );
}
