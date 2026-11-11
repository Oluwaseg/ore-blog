import { logoutAction } from '@/actions/auth';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        className='group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        type='submit'
      >
        Log out
        <LogOut
          aria-hidden='true'
          className='transition-transform group-hover:translate-x-0.5'
          size={14}
        />
      </button>
    </form>
  );
}
