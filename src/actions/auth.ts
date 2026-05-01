"use server";

import { ActionState } from "@/types/action-state";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { authService } from "@/auth";

type AuthIntent = "signin" | "signup";

function getRequiredField(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} is required.`);
  }

  return value.trim();
}

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

function getAuthPagePath(intent: AuthIntent) {
  return intent === "signup" ? "/auth/signup" : "/auth/signin";
}

export async function signIn(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let result;

  try {
    result = await authService.authenticate("email", {
      email: getRequiredField(formData, "email"),
      redirectTo: "/",
    });
  } catch (error) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: getAuthActionErrorMessage(error),
    };
  }

  if (result.redirectTo) {
    redirect(result.redirectTo);
  }

  return {
    isSuccess: true,
    isSubmitted: true,
    msg: result.message ?? "Check your email for a magic link.",
  };
}

export async function signUp(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let result;

  try {
    result = await authService.register("email", {
      email: getRequiredField(formData, "email"),
      redirectTo: "/",
    });
  } catch (error) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: getAuthActionErrorMessage(error),
    };
  }

  if (result.redirectTo) {
    redirect(result.redirectTo);
  }

  return {
    isSuccess: true,
    isSubmitted: true,
    msg: result.message ?? "Check your email for a magic link.",
  };
}

export async function authenticateWithProvider(formData: FormData) {
  const provider = getRequiredField(formData, "provider");
  const intent = (
    formData.get("intent") === "signup" ? "signup" : "signin"
  ) as AuthIntent;

  let result;

  try {
    result =
      intent === "signup"
        ? await authService.register(provider, { redirectTo: "/" })
        : await authService.authenticate(provider, { redirectTo: "/" });
  } catch (error) {
    const message = encodeURIComponent(getAuthActionErrorMessage(error));
    redirect(`${getAuthPagePath(intent)}?error=${message}`);
  }

  if (result.redirectTo) {
    redirect(result.redirectTo);
  }

  redirect(getAuthPagePath(intent));
}
