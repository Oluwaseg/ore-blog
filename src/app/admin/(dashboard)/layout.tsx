import { AdminMobileNav } from '@/components/admin/admin-mobile-nav';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { LogoutButton } from '@/components/admin/logout-button';
import { requireAdmin } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

export const instant = false;

export default async function AdminDashboardLayout({
  children,
}: LayoutProps<'/admin'>) {
  const admin = await requireAdmin();
  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground md:flex-row'>
      <AdminSidebar />

      <div className='flex min-w-0 flex-1 flex-col bg-background'>
        <header className='sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75'>
          <div className='flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-10'>
            <AdminMobileNav />

            <Link
              className='flex min-w-0 items-center gap-2 md:hidden'
              href='/admin'
            >
              <Image
                alt='Beyond the Statute'
                className='h-6 w-8 shrink-0 object-contain'
                height={1024}
                src='/logo.png'
                width={1536}
              />
              <span className='truncate font-heading text-sm font-semibold'>
                Beyond the Statute
              </span>
            </Link>

            <p className='hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:block'>
              {today}
            </p>

            <div className='ml-auto flex items-center gap-4 sm:gap-5'>
              <div className='hidden items-center gap-3 sm:flex'>
                <span
                  aria-hidden='true'
                  className='inline-flex size-7 shrink-0 items-center justify-center bg-primary font-heading text-sm font-medium uppercase text-primary-foreground'
                >
                  {admin.email.charAt(0)}
                </span>
                <p className='max-w-[22ch] truncate text-sm text-muted-foreground'>
                  {admin.email}
                </p>
              </div>
              <span
                aria-hidden='true'
                className='hidden h-4 w-px shrink-0 bg-border sm:block'
              />
              <LogoutButton />
            </div>
          </div>
        </header>

        <div className='flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12'>
          <div className='mx-auto w-full max-w-6xl'>{children}</div>
        </div>
      </div>
    </div>
  );
}
