import { AdminNav } from "@/components/admin/admin-nav";
import { LogoutButton } from "@/components/admin/logout-button";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      <aside className="border-b border-zinc-200 px-4 py-4 md:w-60 md:border-r md:border-b-0 dark:border-zinc-800">
        <p className="mb-4 px-3 text-sm font-semibold">Publication admin</p>
        <AdminNav />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-end gap-4 border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {admin.email}
          </p>
          <LogoutButton />
        </header>
        <div className="flex-1 px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
