import type { Metadata } from 'next';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Admin login',
};

export default function AdminLoginPage() {
  return (
    <main className='flex flex-1 items-center justify-center px-6 py-16'>
      <div className='w-full max-w-sm rounded-md border border-border bg-card p-8'>
        <h1 className='mb-2 text-2xl font-semibold tracking-tight'>
          Admin login
        </h1>
        <p className='mb-8 text-sm text-muted-foreground'>
          Sign in to manage the publication.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
