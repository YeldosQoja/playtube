"use client";

import { useActionState } from "react";
import { Button, Input, Label } from "@/components";
import { registerUser } from "@/actions/auth";

export const ResgiterUserForm = () => {
  const [, action] = useActionState(registerUser, {
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
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
        />
      </div>
      <Button
        type="submit"
        title="Creare"
      />
    </form>
  );
};
