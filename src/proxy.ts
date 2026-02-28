import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./utils/is-authenticated";

export const config = {
  matcher: [
    // Single matcher: exclude API, Next internals, assets, and auth routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$|auth(?:/|$)).*)",
  ],
};

export default function proxy(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return NextResponse.next();
}
