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
          Beyond the Statute asks what the law promises, and what people live.
        </h1>
        <p className='mt-5 text-lg leading-8 text-muted-foreground'>
          Beyond the Statute is an independent publication on sexual and
          gender-based violence, focused on legal research, public education,
          and the realities the law too often leaves out.
        </p>
      </header>

      <div className='space-y-6 text-base leading-8 text-foreground'>
        <p>
          We look beyond the text of the law to the systems, decisions, and
          barriers that shape how justice is experienced in practice. Our work
          includes case-law analysis, comparative research, and public
          commentary on the gaps between legal protection and lived reality.
        </p>
        <p>
          We are committed to survivor-centred reporting, clear public
          education, and a safer space for difficult conversations. We aim to
          challenge myths, reduce stigma, and make legal rights easier to
          understand without shifting blame onto those who have been harmed.
        </p>
        <p>
          This publication is rooted in rigorous research, accountability, and
          respect for the people affected by sexual and gender-based violence.
          We believe justice is not only a legal standard, but a lived reality
          shaped by access, recognition, and care.
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
