import { getPublicationSettings } from '@/lib/publication';
import Link from 'next/link';
import { Suspense } from 'react';

const topics = [
  'Sexual violence and the law in practice',
  'Experiences of male survivors and people with disabilities',
  'Violence and abuse in religious settings',
  'Rights, support, and pathways to justice',
];

export default function HomePage() {
  return (
    <div className='space-y-16 pb-12 sm:space-y-24'>
      <section className='grid gap-10 border-b border-border pb-12 sm:pb-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16'>
        <div className='space-y-7'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
            Beyond the Statute · Legal research · Education · Advocacy
          </p>
          <h1 className='max-w-4xl font-heading text-5xl leading-[1.08] text-foreground sm:text-6xl lg:text-7xl'>
            What does the law promise, and what happens in practice?
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
            A trusted place to learn, question, and find clarity.
          </p>
          <p className='mt-4 text-sm leading-6 text-muted-foreground'>
            Survivor-centred, research-led perspectives on sexual and
            gender-based violence, without victim blaming.
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
            We look beyond legislation to lived realities, overlooked questions,
            and ways to make protections and support more meaningful.
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
            Knowledge should make room for dignity, care, and justice.
          </h2>
          <p className='mt-4 max-w-2xl text-base leading-7 text-muted-foreground'>
            Explore legal research, case-law analysis, public education, and
            survivor-centred commentary at your own pace.
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
