"use client";

import { useCallback, useState } from "react";
import type { FormEventHandler } from "react";
import Link from "next/link";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useSignup } from "@/api";

export default function SignUp() {
  const { mutate } = useSignup();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitCredentials: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      mutate({ firstName, lastName, email, username, password });
    },
    [firstName, lastName, email, username, password, mutate]
  );

  return (
    <>
      <div className="auth-form-container">
        <div>
          <h2 className="auth-title">Create an account</h2>
        </div>
        <div className="auth-body">
          <form
            className="auth-form"
            onSubmit={submitCredentials}>
            <div>
              <Label htmlFor="firstName">First name</Label>
              <div>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <div>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button
                type="submit"
                title="Sign up"
              />
            </div>
          </form>
        </div>
        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
