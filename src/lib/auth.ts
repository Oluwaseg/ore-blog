import { redirect } from "next/navigation";
import { clearSession, getSession } from "@/features/auth/session";
import { db } from "./db";

export async function requireAdmin() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const admin = await db.admin.findUnique({
    where: { id: session.adminId },
    select: { id: true, email: true },
  });

  if (!admin) {
    await clearSession();
    redirect("/admin/login");
  }

  return admin;
}
