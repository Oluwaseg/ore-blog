import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Beyond the Statute is an independent legal research, education, and advocacy platform focused on sexual and gender-based violence.',
};

const principles = [
  {
    title: 'Rigorous research',
    body: 'Case-law analysis, comparative research, and public commentary on the gaps between legal protection and lived reality.',
  },
  {
    title: 'Survivor-centred',
    body: 'Reporting that challenges myths and reduces stigma, without shifting blame onto those who have been harmed.',
  },
  {
    title: 'Clear education',
    body: 'Making legal rights easier to understand, and creating a safer space for difficult conversations.',
  },
];

export default function AboutPage() {
  return (
    <article className='pb-16'>
      {/* Split title: the law vs. lived reality */}
      <header className='border-b border-foreground/80 pb-12'>
        <p className='flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-primary'>
          <span aria-hidden className='h-px w-8 bg-primary' />
          About the publication
        </p>
        <h1 className='mt-6 font-heading text-5xl leading-[1] tracking-tight text-foreground sm:text-6xl lg:text-[5.5rem]'>
          <span className='block'>What the law promises,</span>
          <span className='mt-2 block pl-[8%] italic text-primary sm:pl-[18%]'>
            and what people live.
          </span>
        </h1>
        <div className='mt-10 grid gap-6 lg:grid-cols-12'>
          <p className='font-heading text-xl italic leading-8 text-muted-foreground lg:col-span-7 lg:col-start-6 lg:border-l lg:border-border lg:pl-6'>
            Beyond the Statute is an independent publication on sexual and
            gender-based violence, focused on legal research, public education,
            and the realities the law too often leaves out.
          </p>
        </div>
      </header>

      {/* Body with margin label */}
      <section className='mt-14 grid gap-8 lg:grid-cols-12'>
        <p className='text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted-foreground lg:col-span-3 lg:pt-2'>
          § 1 — Our work
        </p>
        <div className='max-w-prose space-y-6 text-lg leading-8 text-foreground lg:col-span-8'>
          <p className='first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-heading first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-primary'>
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
        </div>
      </section>

      {/* Pull quote */}
      <figure className='relative my-20 overflow-hidden bg-primary px-6 py-16 text-primary-foreground sm:px-16'>
        <span
          aria-hidden
          className='pointer-events-none absolute -left-4 -top-16 font-heading text-[16rem] leading-none opacity-15'
        >
          “
        </span>
        <blockquote className='relative mx-auto max-w-3xl text-center font-heading text-3xl leading-tight text-balance sm:text-5xl'>
          Justice is not only a legal standard, but a <em>lived reality</em>{' '}
          shaped by access, recognition, and care.
        </blockquote>
        <figcaption className='relative mt-8 text-center text-[0.7rem] uppercase tracking-[0.28em] opacity-75'>
          What we believe
        </figcaption>
      </figure>

      {/* Principles */}
      <section
        aria-labelledby='principles'
        className='grid gap-8 lg:grid-cols-12'
      >
        <h2
          className='text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted-foreground lg:col-span-3 lg:pt-2'
          id='principles'
        >
          § 2 — Our principles
        </h2>
        <ol className='grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:col-span-9'>
          {principles.map((item, i) => (
            <li
              className='bg-background p-6 transition-colors hover:bg-accent/40'
              key={item.title}
            >
              <span className='font-heading text-5xl italic leading-none text-primary'>
                {['i', 'ii', 'iii'][i]}.
              </span>
              <p className='mt-6 font-heading text-xl text-foreground'>
                {item.title}
              </p>
              <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className='mt-14 grid gap-8 lg:grid-cols-12'>
        <p className='text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted-foreground lg:col-span-3 lg:pt-2'>
          § 3 — Our commitment
        </p>
        <p className='max-w-prose text-lg leading-8 text-foreground lg:col-span-8'>
          This publication is rooted in rigorous research, accountability, and
          respect for the people affected by sexual and gender-based violence.
        </p>
      </section>

      {/* Closing links */}
      <nav
        aria-label='Continue reading'
        className='mt-20 grid border-y border-foreground/80 sm:grid-cols-2 sm:divide-x sm:divide-border'
      >
        <Link
          className='group flex items-end justify-between gap-4 py-8 sm:pr-8'
          href='/articles'
        >
          <span>
            <span className='block text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground'>
              Read
            </span>
            <span className='mt-2 block font-heading text-3xl text-foreground transition-colors group-hover:text-primary'>
              Explore the articles
            </span>
          </span>
          <span
            aria-hidden
            className='font-heading text-3xl text-primary transition-transform group-hover:translate-x-2'
          >
            →
          </span>
        </Link>
        <Link
          className='group flex items-end justify-between gap-4 border-t border-border py-8 sm:border-t-0 sm:pl-8'
          href='/contact'
        >
          <span>
            <span className='block text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground'>
              Write
            </span>
            <span className='mt-2 block font-heading text-3xl text-foreground transition-colors group-hover:text-primary'>
              Get in touch
            </span>
          </span>
          <span
            aria-hidden
            className='font-heading text-3xl text-primary transition-transform group-hover:translate-x-2'
          >
            →
          </span>
        </Link>
      </nav>
    </article>
  );
}
