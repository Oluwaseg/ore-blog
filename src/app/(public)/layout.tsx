import { SiteFooter } from '@/components/public/site-footer';
import { SiteHeader } from '@/components/public/site-header';
import { getPublicationSettings } from '@/lib/publication';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const publication = await getPublicationSettings();

  return {
    title: {
      default: publication.metaTitle,
      template: `%s | ${publication.name}`,
    },
    description: publication.metaDescription,
  };
}

import { PublicationLoader } from '@/components/public/publication-loader';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <Suspense fallback={<PublicationLoader compact />}>
        <SiteHeader />
      </Suspense>
      <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 sm:px-8 sm:py-14 lg:px-10'>
        {children}
      </main>
      <Suspense fallback={<PublicationLoader compact={false} />}>
        <SiteFooter />
      </Suspense>
    </div>
  );
}
