"use client";

import { useActionState } from "react";

import { signInViaEmail } from "@/actions/auth";
import { Button, Input, Label } from "@/components";

import { AuthOptions } from "./auth-options";

export const SignInForm = () => {
  const [state, action] = useActionState(signInViaEmail, {
    msg: "",
    isSuccess: false,
    isSubmitted: false,
  });

  return (
    <>
      <form
        className="auth-form"
        action={action}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        {state.isSubmitted && (state.err || state.msg) ? (
          <p
            className={`auth-status ${state.err ? "auth-status--error" : ""}`}
            role={state.err ? "alert" : "status"}>
            {state.err ?? state.msg}
          </p>
        ) : null}
        <Button
          title="Sign in"
          type="submit"
        />
      </form>
      <AuthOptions mode="signin" />
    </>
  );
};
