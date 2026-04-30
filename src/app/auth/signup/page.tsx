import Link from "next/link";
import { SignUpForm } from "../_components/signup-form";

const authErrorMessages: Record<string, string> = {
  AccessDenied: "That sign-up request was not accepted.",
  OAuthAccountNotLinked:
    "This email is already linked to another sign-in method.",
  Verification: "That magic link is invalid or has expired.",
};

type PageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignUp({ searchParams }: PageProps) {
  const { error } = await searchParams;
  const errorMessage = error
    ? authErrorMessages[error] ?? decodeURIComponent(error)
    : null;

  return (
    <>
      <div className="auth-form-container">
        <div>
          <h2 className="auth-title">Create an account</h2>
        </div>
        {errorMessage ? (
          <p
            className="auth-status auth-status--error"
            role="alert">
            {errorMessage}
          </p>
        ) : null}
        <div className="auth-body">
          <SignUpForm />
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
