import type { Metadata } from 'next';
import Image from 'next/image';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Editor sign in',
};

export default async function AdminLoginPage() {
  return (
    <main className='grid min-h-dvh flex-1 grid-cols-1 lg:grid-cols-[1.15fr_1fr]'>
      {/* Masthead side */}
      <section
        aria-hidden='true'
        className='relative hidden flex-col justify-between overflow-hidden border-r border-border bg-secondary px-12 py-10 text-secondary-foreground lg:flex xl:px-16'
      >
        <div className='flex items-center justify-between border-b border-foreground/15 pb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground'>
          <span>Editorial Desk</span>
          <span>Restricted Access</span>
        </div>

        <div className='relative'>
          <span className='pointer-events-none absolute -left-4 -top-24 select-none font-heading text-[18rem] leading-none text-primary/10'>
            §
          </span>
          <p className='relative font-mono text-[11px] uppercase tracking-[0.22em] text-primary'>
            No. 01 — The Newsroom
          </p>
          <h2 className='relative mt-6 max-w-[12ch] font-heading text-6xl font-medium leading-[0.95] tracking-tight text-foreground xl:text-7xl'>
            Where the law ends,{' '}
            <em className='font-normal text-primary'>the story</em> begins.
          </h2>
        </div>

        <div className='grid grid-cols-[auto_1fr] items-end gap-6 border-t border-foreground/15 pt-6'>
          <Image
            alt=''
            className='h-14 w-20 object-contain opacity-90'
            height={1024}
            src='/logo.png'
            width={1536}
          />
          <p className='max-w-xs justify-self-end text-right font-heading text-base italic leading-snug text-muted-foreground'>
            An independent publication on law, policy and the people they touch.
          </p>
        </div>
      </section>

      {/* Form side */}
      <section className='flex flex-col px-6 py-8 sm:px-10 lg:px-16 lg:py-10'>
        {/* Mobile masthead */}
        <div className='flex items-center gap-3 border-b border-border pb-5 lg:hidden'>
          <Image
            alt='Beyond the Statute'
            className='h-10 w-14 object-contain'
            height={1024}
            priority
            src='/logo.png'
            width={1536}
          />
          <p className='font-heading text-lg font-semibold tracking-tight text-foreground'>
            Beyond the Statute
          </p>
        </div>

        <div className='hidden justify-end font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground lg:flex'>
          Beyond the Statute
        </div>

        <div className='flex flex-1 items-center py-12'>
          <div className='w-full max-w-sm'>
            <p className='font-mono text-[11px] uppercase tracking-[0.22em] text-primary'>
              Contributors only
            </p>
            <h1 className='mt-4 font-heading text-4xl font-medium leading-tight tracking-tight sm:text-5xl'>
              Editor sign in
            </h1>
            <div className='mt-5 h-px w-12 bg-primary' />
            <p className='mb-10 mt-5 text-sm leading-relaxed text-muted-foreground'>
              Sign in to continue to the editor.
            </p>
            <LoginForm />
          </div>
        </div>

        <Suspense
          fallback={
            <p className='font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground'>
              © 2026 Beyond the Statute
            </p>
          }
        >
          <CurrentYearCopyright />
        </Suspense>
      </section>
    </main>
  );
}

async function CurrentYearCopyright() {
  await connection();
  return (
    <p className='font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground'>
      © {new Date().getFullYear()} Beyond the Statute
    </p>
  );
}
