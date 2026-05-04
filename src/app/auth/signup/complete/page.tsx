"use client";

import Link from "next/link";
import { RegisterUserForm } from "../../_components/register-form";

export default function CompleteSignUp() {
  return (
    <>
      <div className="auth-form-container">
        <div>
          <h2 className="auth-title">Create an account</h2>
        </div>
        <div className="auth-body">
          <RegisterUserForm />
        </div>
        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="auth-link">
            Create
          </Link>
        </p>
      </div>
    </>
  );
}
