import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin login",
};

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          Admin login
        </h1>
        <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
          Sign in to manage the publication.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
