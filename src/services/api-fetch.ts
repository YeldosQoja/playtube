const API_BASE_URL = process.env["NEXT_PUBLIC_BASE_URL"] as string;

export const apiFetch = async (
  url: string | URL,
  options: RequestInit = {},
) => {
  try {
    const headers = new Headers(options.headers);

    if (options.body !== undefined && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(API_BASE_URL + url, {
      credentials: "include",
      ...options,
      headers,
    });

    if (!response.ok) {
      console.error("Fetch error:", response.status, response.statusText);
    }

    const clonedResponse = response.clone();
    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      try {
        const data = await response.json();
        console.log("Response data:", data);
      } catch {
        // Ignore JSON parsing failures in interceptor logic.
      }
    }

    return clonedResponse;
  } catch (error) {
    console.error("Network or fetch error:", error);
    throw error;
  }
};
