import { logoutAction } from '@/actions/auth';

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        className='text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline'
        type='submit'
      >
        Log out
      </button>
    </form>
  );
}
