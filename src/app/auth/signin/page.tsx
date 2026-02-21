"use client";

import { useCallback, useState } from "react";
import type { FormEventHandler } from "react";
import Link from "next/link";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { useSignin } from "@/api";

export default function SignIn() {
  const { mutate } = useSignin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitCredentials: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      mutate({ username, password });
    },
    [username, password, mutate]
  );

  return (
    <>
      <div className="auth-form-container">
        <h2 className="auth-title">Sign in to your account</h2>
        <div className="auth-body">
          <form
            className="auth-form"
            onSubmit={submitCredentials}>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <div className="auth-password-header">
                <Label htmlFor="password"> Password</Label>
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              title="Sign in"
              type="submit"
            />
          </form>
        </div>
        <p className="auth-footer-text">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/auth/signup"
            className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
