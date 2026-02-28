import Link from "next/link";
import { SignInForm } from "../_components/signin-form";

export default function SignIn() {
  return (
    <>
      <div className="auth-form-container">
        <h2 className="auth-title">Sign in to your account</h2>
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
