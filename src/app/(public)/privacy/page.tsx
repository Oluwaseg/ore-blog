import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How Beyond the Statute handles information submitted through this website.',
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className='mx-auto w-full max-w-3xl space-y-8 pb-12'>
      <header className='border-b border-border pb-7'>
        <p className='font-mono text-xs uppercase tracking-wide text-primary'>
          Reader care
        </p>
        <h1 className='mt-3 font-heading text-4xl text-foreground sm:text-5xl'>
          Privacy notice
        </h1>
        <p className='mt-4 text-base leading-7 text-muted-foreground'>
          This notice describes the information the current website collects
          through its forms and how it is used.
        </p>
      </header>
      <section className='space-y-6 text-sm leading-7 text-foreground'>
        <div>
          <h2 className='font-heading text-2xl'>Newsletter</h2>
          <p className='mt-2 text-muted-foreground'>
            If you subscribe, we store your email address and subscription
            status to send publication updates and process unsubscribe requests.
            The welcome email contains an unsubscribe link.
          </p>
        </div>
        <div>
          <h2 className='font-heading text-2xl'>Comments</h2>
          <p className='mt-2 text-muted-foreground'>
            Comments are public. Display name and username are optional; an
            email address is optional and is not shown publicly. Please do not
            include private details about yourself or another person unless you
            are comfortable sharing them publicly.
          </p>
        </div>
        <div>
          <h2 className='font-heading text-2xl'>Story submissions</h2>
          <p className='mt-2 text-muted-foreground'>
            Story submissions are stored privately for editorial review and are
            not published automatically. You may request anonymity. Contact
            details are optional and used only if provided; never include
            identifying details about someone else without their permission.
          </p>
        </div>
        <div>
          <h2 className='font-heading text-2xl'>Contact enquiries</h2>
          <p className='mt-2 text-muted-foreground'>
            Messages sent through the contact form are delivered to the
            publication contact email. Please avoid sending urgent or highly
            sensitive personal information through the form.
          </p>
        </div>
        <div>
          <h2 className='font-heading text-2xl'>Questions or requests</h2>
          <p className='mt-2 text-muted-foreground'>
            For privacy questions or requests concerning information you
            submitted, contact{' '}
            <a
              className='text-primary underline-offset-4 hover:underline'
              href='mailto:beyondthestatutee@gmail.com'
            >
              beyondthestatutee@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </article>
  );
}
