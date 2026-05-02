"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { ActionState } from "@/types/action-state";
import { authService } from "@/auth";
import z from "zod";

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
      isSubmitted: true,
      msg: error.message,
    };
  }

  try {
    const result = await authService.authenticate("email", {
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
      isSubmitted: true,
      msg: error.message,
    };
  }

  try {
    const result = await authService.register("email", {
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

export async function signInViaProvider(formData: FormData) {
  const { data: provider, error } = await zodProvider.safeParseAsync(
    formData.get("provider"),
  );
  if (error) {
    return;
  }

  try {
    const result = await authService.authenticate(provider, {
      redirectTo: "/",
    });

    redirect("/auth/signin");
  } catch (error) {
    const message = encodeURIComponent(getAuthActionErrorMessage(error));
    redirect(`/auth/signin?error=${message}`);
  }
}

export async function signUpViaProvider(formData: FormData) {
  const { data: provider, error } = await zodProvider.safeParseAsync(
    formData.get("provider"),
  );
  if (error) {
    return;
  }

  try {
    const result = await authService.register(provider, { redirectTo: "/" });

    redirect("/auth/signup");
  } catch (error) {
    const message = encodeURIComponent(getAuthActionErrorMessage(error));
    redirect(`/auth/signup?error=${message}`);
  }
}
