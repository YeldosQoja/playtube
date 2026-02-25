"use server";

import { ActionState } from "@/types/action-state";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseString as parseSetCookie } from "set-cookie-parser";

const API_BASE_URL = process.env["API_BASE_URL"];

export async function signIn(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const response = await fetch(API_BASE_URL + "auth/signin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
    credentials: "include",
  });

  if (!response.ok) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: `Can't sign in with username ${formData.get("username")}`,
    };
  }

  const setCookie = response.headers.getSetCookie();
  const cookieStore = await cookies();

  if (setCookie) {
    const cookie = parseSetCookie(setCookie[0]);
    cookieStore.set({
      ...cookie,
      sameSite: cookie.sameSite as "lax" | "strict" | "none",
    });
  }

  redirect("/");
}

export async function signUp(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const response = await fetch(API_BASE_URL + "auth/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      username: formData.get("username"),
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      password: formData.get("password"),
    }),
  });

  if (!response.ok) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: "Couldn't create account!",
    };
  }

  return {
    isSuccess: true,
    isSubmitted: true,
    msg: `${formData.get("username")} account is successfully created!`,
  };
}
