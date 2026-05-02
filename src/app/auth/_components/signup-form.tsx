"use client";

import { useActionState } from "react";

import { signUpViaEmail } from "@/actions/auth";
import { Button, Input, Label } from "@/components";

import { AuthOptions } from "./auth-options";

export const SignUpForm = () => {
  const [state, action] = useActionState(signUpViaEmail, {
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
          type="submit"
          title="Sign up"
        />
      </form>
      <AuthOptions mode="signup" />
    </>
  );
};
