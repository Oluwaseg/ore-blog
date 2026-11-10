import { cookies } from "next/headers";

export const VISITOR_COOKIE = "ore_visitor";

export async function getVisitorId() {
  const cookieStore = await cookies();
  return cookieStore.get(VISITOR_COOKIE)?.value ?? null;
}

export async function getOrCreateVisitorId() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(VISITOR_COOKIE)?.value;

  if (existing) {
    return existing;
  }

  const visitorId = crypto.randomUUID();

  cookieStore.set(VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });

  return visitorId;
}
