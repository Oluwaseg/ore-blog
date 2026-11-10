import { logoutAction } from "@/actions/auth";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        className="text-sm font-medium text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
        type="submit"
      >
        Log out
      </button>
    </form>
  );
}
