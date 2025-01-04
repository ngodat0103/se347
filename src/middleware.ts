import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "@/lib/jwt_utils";

export async function middleware(request: NextRequest) {
  // Check access token first
  const token = request.cookies.get("accessToken")?.value;
  const token_valid = await isTokenValid(token);

  // If token is invalid then remove it from cookies
  if (!token_valid) {
    request.cookies.delete("accessToken");
  }

  // Auto redirect from landing page to dashboard if user is logged in
  if (request.nextUrl.pathname === "/") {
    if (token_valid) {
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

  // Check if user is logged in
  if (!token_valid) {
    // Save the current URL to cookies for redirecting after login
    login_redirect.cookies.set(
      "redirectUrlAfterLogin",
      request.nextUrl.pathname,
    );
    return login_redirect;
  }

  // -------------------------------------------------

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/setting", "/workspaces", "/workspaces/:path*"],
};
