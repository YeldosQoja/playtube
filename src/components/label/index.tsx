import "./styles.css";
import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  dummy?: string;
}

export const Label = ({ className, ...rest }: LabelProps) => {
  return (
    <label
      className={`label ${className || ""}`}
      {...rest}
    />
  );
};
