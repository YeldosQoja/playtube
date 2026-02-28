"use client";

import { useActionState } from "react";
import { Button, Input, Label } from "@/components";
import { signUp } from "@/actions/auth";

export const SignUpForm = () => {
  const [, action] = useActionState(signUp, {
    msg: "",
    isSuccess: false,
    isSubmitted: false,
  });

  return (
    <form
      className="auth-form"
      action={action}>
      <div>
        <Label htmlFor="firstName">First name</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          required
          autoComplete="given-name"
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last name</Label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          required
          autoComplete="family-name"
        />
      </div>
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
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
        />
      </div>
      <Button
        type="submit"
        title="Sign up"
      />
    </form>
  );
};
