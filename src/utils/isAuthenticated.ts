import "server-only";
import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest) {
  const { cookies } = request;
  return cookies.has("connect.sid");
}
