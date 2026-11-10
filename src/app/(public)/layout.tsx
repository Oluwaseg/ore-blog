import { SiteFooter } from '@/components/public/site-footer';
import { SiteHeader } from '@/components/public/site-header';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>
      <SiteHeader />
      <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8 sm:px-8 lg:px-10'>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
