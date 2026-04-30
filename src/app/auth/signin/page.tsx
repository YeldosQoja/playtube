import Link from "next/link";
import { SignInForm } from "../_components/signin-form";

const authErrorMessages: Record<string, string> = {
  AccessDenied: "That sign-in request was not accepted.",
  OAuthAccountNotLinked:
    "This email is already linked to another sign-in method.",
  Verification: "That magic link is invalid or has expired.",
};

type PageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignIn({ searchParams }: PageProps) {
  const { error } = await searchParams;
  const errorMessage = error
    ? authErrorMessages[error] ?? decodeURIComponent(error)
    : null;

  return (
    <>
      <div className="auth-form-container">
        <h2 className="auth-title">Sign in to your account</h2>
        {errorMessage ? (
          <p
            className="auth-status auth-status--error"
            role="alert">
            {errorMessage}
          </p>
        ) : null}
        <div className="auth-body">
          <SignInForm />
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
