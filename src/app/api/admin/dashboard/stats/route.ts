import { getDashboardStats } from '@/features/admin/dashboard';
import { getSession } from '@/features/auth/session';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getSession();

  if (!session) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  const admin = await db.admin.findUnique({
    where: { id: session.adminId },
    select: { id: true },
  });

  if (!admin) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  const stats = await getDashboardStats();

  return Response.json(stats, {
    headers: { 'Cache-Control': 'private, no-store' },
  });
}
