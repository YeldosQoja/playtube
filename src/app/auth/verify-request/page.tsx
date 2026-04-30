import Link from "next/link";

export default function VerifyRequestPage() {
  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Check your email</h2>
      <div className="auth-body">
        <p className="auth-helper-text">
          We sent you a magic link. Open it from your inbox to finish signing
          in.
        </p>
      </div>
      <p className="auth-footer-text">
        Need a different address?{" "}
        <Link
          href="/auth/signin"
          className="auth-link">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
