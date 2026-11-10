import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Beyond the Statute is an independent legal research, education, and advocacy platform focused on sexual and gender-based violence.',
};

export default function AboutPage() {
  return (
    <article className='mx-auto w-full max-w-3xl space-y-10 pb-12'>
      <header className='border-b border-border pb-8'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          About
        </p>
        <h1 className='mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          Beyond the Statute: what justice promises, and what people experience.
        </h1>
        <p className='mt-5 text-lg leading-8 text-muted-foreground'>
          An independent legal research, education, and advocacy platform
          committed to advancing understanding, awareness, and meaningful
          conversations around sexual and gender-based violence.
        </p>
      </header>

      <div className='space-y-6 text-base leading-8 text-foreground'>
        <p>
          We explore these issues beyond the confines of legislation through
          legal research, case-law analysis, comparative studies, evidence-based
          commentary, and public education. We ask what the law promises, how
          protections work in practice, whose realities are overlooked, and what
          can make justice more accessible and meaningful.
        </p>
        <p>
          Beyond the Statute is intended as a safe, inclusive, and accessible
          space for learning and respectful conversation. We work to challenge
          myths, make rights and legal pathways easier to understand, reduce
          stigma, and keep discussions survivor-centred and free from victim
          blaming.
        </p>
        <p>
          Our work is grounded in rigorous research, care, procedural fairness,
          intellectual honesty, and accountability. We believe meaningful change
          takes more than laws: it also takes understanding, implementation, and
          attention to the barriers people face when seeking support and
          justice.
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
