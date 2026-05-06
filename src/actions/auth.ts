"use server";

import { AuthError } from "next-auth";
import { ActionState } from "@/types/action-state";
import { authService } from "@/auth";
import z from "zod";
import { cookies } from "next/headers";
import { fetch } from "@/lib/fetch.interceptor";
import { redirect } from "next/navigation";

const zodEmail = z.email().nonempty();
const zodProvider = z.literal(["google", "apple", "github"]);

function getAuthActionErrorMessage(error: unknown) {
  if (error instanceof AuthError) {
    switch (error.type) {
      case "AccessDenied":
        return "That sign-in request was not accepted.";
      case "OAuthAccountNotLinked":
        return "This email is already linked to a different sign-in method.";
      default:
        return "Authentication failed. Please try again.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Authentication failed. Please try again.";
}

export async function signInViaEmail(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { data: email, error } = await zodEmail.safeParseAsync(
    formData.get("email"),
  );
  if (error) {
    return {
      isSuccess: false,
      isSubmitted: false,
      msg: error.message,
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("auth_intent", "signin", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
  });

  try {
    await authService.authenticate("email", {
      email,
      redirectTo: "/",
    });

    return {
      isSuccess: true,
      isSubmitted: true,
      msg: "Check your email for a magic link.",
    };
  } catch (error) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: getAuthActionErrorMessage(error),
    };
  }
}

export async function signUpViaEmail(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { data: email, error } = await zodEmail.safeParseAsync(
    formData.get("email"),
  );
  if (error) {
    return {
      isSuccess: false,
      isSubmitted: false,
      msg: error.message,
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("auth_intent", "signup", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
  });

  try {
    await authService.register("email", {
      email,
      redirectTo: "/auth/signup/complete",
    });

    return {
      isSuccess: true,
      isSubmitted: true,
      msg: "Check your email for a magic link.",
    };
  } catch (error) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: getAuthActionErrorMessage(error),
    };
  }
}

export async function signInViaProvider(formData: FormData) {
  const { data: provider, error } = await zodProvider.safeParseAsync(
    formData.get("provider"),
  );
  if (error) {
    return {
      isSuccess: false,
      isSubmitted: false,
      msg: error.message,
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("auth_intent", "signin", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
  });

  try {
    await authService.authenticate(provider, {
      redirectTo: "/",
    });
    return {
      isSuccess: true,
      isSubmitted: true,
      msg: "Signed in",
    };
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    const message = encodeURIComponent(getAuthActionErrorMessage(error));
    return {
      isSuccess: false,
      isSubmitted: true,
      msg: message,
    };
  }
}

export async function signUpViaProvider(formData: FormData) {
  const { data: provider, error } = await zodProvider.safeParseAsync(
    formData.get("provider"),
  );
  if (error) {
    return;
  }

  const cookieStore = await cookies();

  cookieStore.set("auth_intent", "signup", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
  });

  try {
    await authService.register(provider, {
      redirectTo: "/auth/signup/complete",
    });

    return {
      isSuccess: true,
      isSubmitted: true,
      msg: "Check your email for a magic link.",
    };
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    const message = encodeURIComponent(getAuthActionErrorMessage(error));
    return {
      isSuccess: false,
      isSubmitted: true,
      msg: message,
    };
  }
}

export async function registerUser(prevState: ActionState, formData: FormData) {
  const response = await fetch("account/create", {
    method: "POST",
    body: JSON.stringify({
      username: formData.get("username"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    }),
  });

  if (!response.ok) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: "Couldn't create account!",
    };
  }

  redirect("/");

  // return {
  //   isSuccess: true,
  //   isSubmitted: true,
  //   msg: `${formData.get("username")} account is successfully created!`,
  // };
}
