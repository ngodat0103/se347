import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//Middleware sẽ hoạt động ở phía server bao ve tuyen duong

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
