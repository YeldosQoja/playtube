import "./styles.css";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, title, ...rest }, ref) => {
    return (
      <button
        className={`btn ${className || ""}`}
        {...rest}
        ref={ref}>
        {title}
      </button>
    );
  }
);

Button.displayName = "Button";
