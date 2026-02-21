import "./styles.css";
import type { ReactNode, CSSProperties } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type Props = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  triggerStyle?: CSSProperties;
  placeholder?: string;
};

export const Select = ({
  value,
  options,
  onChange,
  triggerStyle,
  placeholder,
}: Props) => {
  const selectedOption = options.find((o) => o.value === value);

  return (
    <RadixSelect.Root
      value={value}
      onValueChange={onChange}>
      <RadixSelect.Trigger
        value={selectedOption?.label}
        className="select-trigger"
        style={triggerStyle}
        aria-label="Select option">
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon asChild>
          <ChevronDown
            className="icon"
            size={20}
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="select-content"
          position="popper"
          sideOffset={5}>
          <RadixSelect.ScrollUpButton />
          <RadixSelect.ScrollDownButton />
          <RadixSelect.Viewport>
            {options.map((o) => (
              <RadixSelect.Item
                key={o.value}
                value={o.value}
                className="select-item">
                <RadixSelect.ItemIndicator asChild>
                  <Check
                    size={18}
                    className="item-indicator"
                  />
                </RadixSelect.ItemIndicator>
                {o.icon}
                <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
