import "./styles.css";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import type { CheckboxProps } from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { Label } from "../label";

type Props = {
  label: string;
};

export const Checkbox = ({
  label,
  className,
  ...rest
}: CheckboxProps & Props) => {
  return (
    <div className="checkbox">
      <RadixCheckbox.Root
        {...rest}
        className={`checkbox__root ${className || ""}`}>
        <RadixCheckbox.Indicator asChild>
          <Check
            size={18}
            className="icon"
          />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <Label htmlFor={rest.id}>{label}</Label>
    </div>
  );
};
