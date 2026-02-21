import "./styles.css";
import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  dummy?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ className, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={`input ${className ?? ""}`}
      {...rest}
    />
  );
});

Input.displayName = "Input";
