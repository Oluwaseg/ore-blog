"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="current-password"
          className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
          id="password"
          name="password"
          required
          type="password"
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        className="h-11 rounded-md bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        disabled={pending}
        type="submit"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
