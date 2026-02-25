import Link from "next/link";
import { SignUpForm } from "../_components/SignUpForm";

export default function SignUp() {
  return (
    <>
      <div className="auth-form-container">
        <div>
          <h2 className="auth-title">Create an account</h2>
        </div>
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
