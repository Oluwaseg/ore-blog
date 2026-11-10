"use client";

import { useActionState } from "react";
import { subscribeNewsletterAction } from "@/actions/engagement";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletterAction,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <div className="flex gap-2">
        <input
          className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
          id="newsletter-email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        <button
          className="h-10 rounded-md bg-zinc-900 px-3 text-sm font-medium text-white disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900"
          disabled={pending}
          type="submit"
        >
          {pending ? "Saving..." : "Subscribe"}
        </button>
      </div>
      <input
        autoComplete="off"
        className="hidden"
        name="company"
        tabIndex={-1}
      />
      {state?.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="text-sm text-zinc-600">{state.success}</p>
      ) : null}
    </form>
  );
}
