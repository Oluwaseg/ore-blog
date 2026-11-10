import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { LogoutButton } from '@/components/admin/logout-button';
import { requireAdmin } from '@/lib/auth';

export const instant = false;

export default async function AdminDashboardLayout({
  children,
}: LayoutProps<'/admin'>) {
  const admin = await requireAdmin();

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground md:flex-row'>
      <AdminSidebar />
      <div className='flex min-w-0 flex-1 flex-col bg-background'>
        <header className='flex items-center justify-end gap-4 border-b border-border px-6 py-4'>
          <p className='text-sm text-muted-foreground'>{admin.email}</p>
          <LogoutButton />
        </header>
        <div className='flex-1 px-6 py-8'>{children}</div>
      </div>
    </div>
  );
}
