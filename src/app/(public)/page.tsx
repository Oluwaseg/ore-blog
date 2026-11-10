import { getPublicationSettings } from '@/lib/publication';
import Link from 'next/link';
import { Suspense } from 'react';

const topics = [
  'Sexual violence awareness',
  'Education and prevention',
  'Community care',
  'Public accountability',
];

export default function HomePage() {
  return (
    <div className='space-y-16 pb-12 sm:space-y-24'>
      <section className='grid gap-10 border-b border-border pb-12 sm:pb-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16'>
        <div className='space-y-7'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
            Independent publication · Awareness · Education
          </p>
          <h1 className='max-w-4xl font-heading text-5xl leading-[1.08] text-foreground sm:text-6xl lg:text-7xl'>
            Stories that deserve to be heard.
          </h1>
          <Suspense
            fallback={
              <p className='h-14 max-w-2xl animate-pulse rounded bg-muted' />
            }
          >
            <PublicationDescription />
          </Suspense>
          <div className='flex flex-wrap items-center gap-3 pt-1'>
            <Link
              className='inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90'
              href='/articles'
            >
              Explore articles
            </Link>
            <Link
              className='inline-flex min-h-11 items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
              href='/about'
            >
              Our purpose
            </Link>
          </div>
        </div>

        <aside className='border-l-2 border-primary/40 pl-5 sm:pl-6'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
            Our focus
          </p>
          <p className='mt-3 font-heading text-2xl leading-snug text-foreground sm:text-3xl'>
            Thoughtful perspectives on difficult conversations.
          </p>
          <p className='mt-4 text-sm leading-6 text-muted-foreground'>
            Grounded in care, informed by evidence, and committed to making
            knowledge accessible.
          </p>
        </aside>
      </section>

      <section
        aria-labelledby='topics-heading'
        className='grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16'
      >
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
            The conversation
          </p>
          <h2
            id='topics-heading'
            className='mt-3 font-heading text-3xl leading-tight text-foreground sm:text-4xl'
          >
            What we cover
          </h2>
          <p className='mt-4 max-w-sm text-sm leading-6 text-muted-foreground'>
            We bring together stories and ideas that help readers understand the
            issues and imagine a more informed response.
          </p>
        </div>

        <ul className='border-y border-border'>
          {topics.map((topic, index) => (
            <li
              key={topic}
              className='flex items-center gap-5 border-b border-border py-4 last:border-0 sm:py-5'
            >
              <span className='font-mono text-xs text-primary'>
                0{index + 1}
              </span>
              <span className='font-heading text-xl text-foreground sm:text-2xl'>
                {topic}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className='grid gap-8 border-t border-border pt-10 sm:pt-12 md:grid-cols-[1fr_auto] md:items-center'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
            Read with care
          </p>
          <h2 className='mt-3 max-w-2xl font-heading text-3xl leading-tight text-foreground sm:text-4xl'>
            Information can open the door to understanding.
          </h2>
          <p className='mt-4 max-w-2xl text-base leading-7 text-muted-foreground'>
            Explore reporting, essays, and resources at your own pace. Our aim
            is to make room for nuance, dignity, and meaningful change.
          </p>
        </div>
        <Link
          className='inline-flex min-h-11 items-center justify-center self-start rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 md:self-center'
          href='/articles'
        >
          Browse the publication
        </Link>
      </section>
    </div>
  );
}

async function PublicationDescription() {
  const publication = await getPublicationSettings();

  return (
    <p className='max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8'>
      {publication.description}
    </p>
  );
}
