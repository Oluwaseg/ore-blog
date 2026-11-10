'use server';

import { verifyPasswordOrDummy } from '@/features/auth/password';
import {
  clearSession,
  createSession,
  getSession,
} from '@/features/auth/session';
import { db } from '@/lib/db';
import { loginSchema } from '@/lib/validations/auth';
import { redirect } from 'next/navigation';

export type LoginState = {
  error?: string;
  success?: string;
} | null;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: 'Invalid email or password.' };
  }

  const email = parsed.data.email.toLowerCase();
  const admin = await db.admin.findUnique({
    where: { email },
  });

  const isValid = await verifyPasswordOrDummy(
    admin?.passwordHash,
    parsed.data.password
  );

  if (!admin || !isValid) {
    return { error: 'Invalid email or password.' };
  }

  await createSession({
    adminId: admin.id,
    email: admin.email,
  });

  return { success: 'Signed in successfully.' };
}

export async function logoutAction() {
  const session = await getSession();

  if (session) {
    await clearSession();
  }

  redirect('/admin/login');
}
