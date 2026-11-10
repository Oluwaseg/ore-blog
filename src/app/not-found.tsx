import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex min-h-[70vh] items-center justify-center bg-background px-6 py-16 text-foreground'>
      <div className='w-full max-w-xl border-l-2 border-primary pl-6 sm:pl-8'>
        <p className='font-mono text-sm text-primary'>404</p>
        <h1 className='mt-4 font-heading text-4xl leading-tight sm:text-5xl'>
          This page could not be found.
        </h1>
        <p className='mt-4 max-w-md text-base leading-7 text-muted-foreground'>
          The address may be outdated, or the page may have moved.
        </p>
        <Link
          className='mt-7 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90'
          href='/'
        >
          Return to homepage
        </Link>
      </div>
    </main>
  );
}
