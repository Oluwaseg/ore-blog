import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/features/auth/constants";
import { decryptSession } from "@/features/auth/session-token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await decryptSession(token) : null;

  if (!isLogin && !session) {
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url),
    );

    if (token) {
      response.cookies.delete(SESSION_COOKIE);
    }

    return response;
  }

  if (isLogin && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
