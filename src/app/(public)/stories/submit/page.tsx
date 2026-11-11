import { StorySubmissionForm } from '@/components/public/story-submission-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Share your story',
  description:
    'Submit a story privately for editorial review by Beyond the Statute.',
  robots: { index: false, follow: false },
};

const steps = [
  {
    title: 'You write',
    body: 'In your own words, at your own pace. With your name or anonymously.',
  },
  {
    title: 'We read',
    body: 'Only the editorial team sees your submission. It is never shared.',
  },
  {
    title: 'We decide together',
    body: 'Nothing is published without review. Sending is not consent to publish.',
  },
];

export default function SubmitStoryPage() {
  return (
    <article className='pb-16'>
      <header className='relative mx-auto max-w-4xl text-center'>
        <p className='inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-primary'>
          <span aria-hidden className='h-px w-8 bg-primary' />
          Community
          <span aria-hidden className='h-px w-8 bg-primary' />
        </p>
        <h1 className='mt-6 font-heading text-6xl leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl'>
          Share your <em className='text-primary'>story</em>
          <span className='text-primary'>.</span>
        </h1>
        <p className='mx-auto mt-6 max-w-2xl font-heading text-xl italic leading-8 text-muted-foreground'>
          Every voice here is held with care. Tell us what happened, what it
          meant, and what you want others to understand.
        </p>
        <p aria-hidden className='mt-8 font-heading text-3xl text-primary/60'>
          ❦
        </p>
      </header>

      {/* Process strip */}
      <ol className='mx-auto mt-12 grid max-w-5xl border-y border-foreground/80 sm:grid-cols-3 sm:divide-x sm:divide-border'>
        {steps.map((step, i) => (
          <li
            className='flex gap-4 border-b border-border px-2 py-6 last:border-b-0 sm:border-b-0 sm:px-6'
            key={step.title}
          >
            <span className='font-heading text-4xl italic leading-none text-primary'>
              {i + 1}
            </span>
            <div>
              <p className='font-heading text-lg text-foreground'>
                {step.title}
              </p>
              <p className='mt-1 text-sm leading-6 text-muted-foreground'>
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Manuscript sheet */}
      <section
        aria-labelledby='manuscript'
        className='relative mx-auto mt-16 max-w-3xl'
      >
        <div
          aria-hidden
          className='absolute inset-x-6 -bottom-3 top-3 rounded-sm bg-secondary'
        />
        <div
          aria-hidden
          className='absolute inset-x-3 -bottom-1.5 top-1.5 rounded-sm border border-border bg-muted'
        />
        <div className='relative overflow-hidden rounded-sm border border-border bg-card shadow-sm'>
          {/* Margin rule, like a notebook */}
          <span
            aria-hidden
            className='absolute inset-y-0 left-10 hidden w-px bg-primary/25 sm:block'
          />
          <div className='flex items-center justify-between gap-4 border-b border-border bg-accent/40 px-6 py-3 sm:pl-16'>
            <h2
              className='text-[0.7rem] font-medium uppercase tracking-[0.28em] text-accent-foreground'
              id='manuscript'
            >
              Manuscript · Private
            </h2>
            <span className='inline-flex items-center gap-2 text-xs text-accent-foreground'>
              <span aria-hidden className='size-1.5 rounded-full bg-primary' />
              Seen only by editors
            </span>
          </div>
          <div className='p-6 sm:py-10 sm:pl-16 sm:pr-10'>
            <StorySubmissionForm />
          </div>
        </div>
      </section>

      <p className='mx-auto mt-12 max-w-xl text-center text-sm leading-6 text-muted-foreground'>
        If you are in immediate danger, please contact local emergency services.
        This form is not monitored in real time.
      </p>
    </article>
  );
}
