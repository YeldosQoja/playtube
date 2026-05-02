"use client";

import { Apple, Github } from "lucide-react";

import { signInViaProvider, signUpViaProvider } from "@/actions/auth";

type Props = {
  mode: "signin" | "signup";
};

type AuthProvider = {
  id: "apple" | "github" | "google";
  label: string;
  icon?: typeof Apple;
};

const providers: AuthProvider[] = [
  { id: "google", label: "Google" },
  { id: "apple", label: "Apple", icon: Apple },
  { id: "github", label: "GitHub", icon: Github },
];

export const AuthOptions = ({ mode }: Props) => {
  return (
    <div className="auth-social">
      <p className="auth-social-label">
        {mode === "signin" ? "Or continue with" : "Or sign up with"}
      </p>
      <div className="auth-social-actions">
        {providers.map(({ id, icon: Icon, label }) => (
          <form
            key={id}
            action={mode === "signin" ? signInViaProvider : signUpViaProvider}>
            <input
              type="hidden"
              name="intent"
              value={mode}
            />
            <input
              type="hidden"
              name="provider"
              value={id}
            />
            <button
              className="auth-social-button"
              type="submit"
              aria-label={label}>
              {Icon ? (
                <Icon
                  size={16}
                  aria-hidden="true"
                />
              ) : (
                <span className="auth-social-button__text">G</span>
              )}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};
