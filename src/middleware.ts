import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "@/lib/jwt_utils";

export async function middleware(request: NextRequest) {
  // Authentcation middleware ------------------------

  // Login redirect
  const login_redirect = NextResponse.redirect(new URL("/sign-in", request.url));

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
  matcher: ["/dashboard", "/setting", "/workspaces", "/workspaces/:path*"],
};
