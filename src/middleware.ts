import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "@/lib/jwt_utils";

export async function middleware(request: NextRequest) {
  // Auto redirect from landing page to dashboard if user is logged in
  if (request.nextUrl.pathname === "/") {
    const token = request.cookies.get("accessToken")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // If user is not logged in then return next, don't run Auth middleware
    return NextResponse.next();
  }

  // Authentication middleware ------------------------

  // Login redirect
  const login_redirect = NextResponse.redirect(
    new URL("/sign-in", request.url),
  );

  const token = request.cookies.get("accessToken")?.value;
  if (!token) {
    return login_redirect;
  }

  // Check token
  const tokenValid = await isTokenValid(token);
  if (!tokenValid) {
    return login_redirect;
  }

  // -------------------------------------------------

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/setting", "/workspaces", "/workspaces/:path*"],
};
