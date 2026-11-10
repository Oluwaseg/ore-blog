import { StorySubmissionForm } from '@/components/public/story-submission-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Share your story',
  description:
    'Submit a story privately for editorial review by Beyond the Statute.',
  robots: { index: false, follow: false },
};

export default function SubmitStoryPage() {
  return (
    <article className='mx-auto w-full max-w-3xl space-y-8 pb-12'>
      <header className='border-b border-border pb-7'>
        <p className='font-mono text-xs uppercase tracking-wide text-primary'>
          Community
        </p>
        <h1 className='mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl'>
          Share your story
        </h1>
        <p className='mt-4 max-w-2xl text-base leading-7 text-muted-foreground'>
          You may submit with your name or anonymously. Every submission is
          private and reviewed by the editorial team; sending it does not mean
          it will be published.
        </p>
      </header>
      <StorySubmissionForm />
    </article>
  );
}
