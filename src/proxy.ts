import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

export const config = {
  matcher: [
    // Single matcher: exclude API, Next internals, assets, and auth routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$|auth(?:/|$)).*)",
  ],
};

export default auth((request: NextRequest & { auth: unknown }) => {
  if (!request.auth) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
});
