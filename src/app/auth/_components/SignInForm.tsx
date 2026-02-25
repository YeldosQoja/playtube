"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button, Input, Label } from "@/components";
import { signIn } from "@/actions/auth";

export const SignInForm = () => {
  const [, action] = useActionState(signIn, {
    msg: "",
    isSuccess: false,
    isSubmitted: false,
  });

  return (
    <form
      className="auth-form"
      action={action}>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="email"
        />
      </div>
      <div>
        <div className="auth-password-header">
          <Label htmlFor="password">Password</Label>
          <Link
            href="#"
            className="forgot-password-link">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      <Button
        title="Sign in"
        type="submit"
      />
    </form>
  );
};
