import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "./constants";
import {
  type AdminSession,
  decryptSession,
  encryptSession,
} from "./session-token";

export type { AdminSession };

export async function createSession(session: AdminSession) {
  const token = await encryptSession(session);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return decryptSession(token);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
