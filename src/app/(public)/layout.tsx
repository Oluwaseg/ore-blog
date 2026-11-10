import { SiteFooter } from '@/components/public/site-footer';
import { SiteHeader } from '@/components/public/site-header';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <SiteHeader />
      <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 sm:px-8 sm:py-14 lg:px-10'>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
