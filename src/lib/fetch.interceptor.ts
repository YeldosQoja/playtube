import { auth, authService } from "@/auth";
import "server-only";

const API_BASE_URL = process.env["API_BASE_URL"] as string;

const fetch = global.fetch;

global.fetch = async (url, init = {}): Promise<Response> => {
  const session = await auth();
  if (session === null) {
    throw new Error("Not authenticated.");
  }
  // @ts-expect-error NextAuth's Session type is not compatible with custom domain Session contract
  const token = await authService.mintInternalToken(session);

  const headers = new Headers(init.headers);

  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  headers.set("authorization", "Bearer " + token);

  const response = await fetch(API_BASE_URL + url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    console.error("Fetch error:", response.status, response.statusText);
  }

  const clonedResponse = response.clone();

  return clonedResponse;
};
