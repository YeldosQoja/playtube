import "./styles.css";
import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="auth">
      {children}
    </div>
  );
}
