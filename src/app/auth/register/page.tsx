"use client";

import Link from "next/link";
import { ResgiterUserForm } from "../_components/register-form";

export const Register = () => {
  return (
    <>
      <div className="auth-form-container">
        <div>
          <h2 className="auth-title">Create an account</h2>
        </div>
        <div className="auth-body">
          <ResgiterUserForm />
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
};
