import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'About this independent editorial publication.',
};

export default function AboutPage() {
  return (
    <article className='mx-auto w-full max-w-3xl space-y-10 pb-12'>
      <header className='border-b border-border pb-8'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          About
        </p>
        <h1 className='mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          A place for informed, thoughtful conversation.
        </h1>
        <p className='mt-5 text-lg leading-8 text-muted-foreground'>
          This independent publication shares articles, insights, stories, and
          perspectives on important social issues.
        </p>
      </header>

      <div className='space-y-6 text-base leading-8 text-foreground'>
        <p>
          Our focus includes sexual violence awareness, education, prevention,
          and the community conversations that help people better understand
          these issues.
        </p>
        <p>
          We aim to make relevant information accessible and to create room for
          careful discussion, respect, and learning.
        </p>
      </div>

      <div className='border-t border-border pt-6'>
        <Link
          className='text-sm font-medium text-primary underline-offset-4 hover:underline'
          href='/articles'
        >
          Explore published articles
        </Link>
      </div>
    </article>
  );
}
