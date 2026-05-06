import { NextRequest, NextResponse } from "next/server";
import { fetch } from "@/lib/fetch.interceptor";

type RouteContext = {
  params: Promise<{ main?: string[] }> | { main?: string[] };
};

const BODYLESS_METHODS = new Set(["GET", "HEAD"]);
const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

async function handler(request: NextRequest, context: RouteContext) {
  const { main = [] } = await context.params;
  const pathname = main.map(encodeURIComponent).join("/");
  const target = `${pathname}${request.nextUrl.search}`;
  const headers = new Headers(request.headers);

  for (const header of HOP_BY_HOP_HEADERS) {
    headers.delete(header);
  }

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: BODYLESS_METHODS.has(request.method)
      ? undefined
      : await request.arrayBuffer(),
  });

  const responseHeaders = new Headers(response.headers);

  for (const header of HOP_BY_HOP_HEADERS) {
    responseHeaders.delete(header);
  }

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export {
  handler as DELETE,
  handler as GET,
  handler as HEAD,
  handler as OPTIONS,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
