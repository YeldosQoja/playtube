import "./styles.css";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { Label } from "../label";

type RadioGroupItem = {
  value: string;
  label: string;
};

type Props = {
  items: RadioGroupItem[];
  value?: string;
  onChange?: (value: string) => void;
};

export const RadioGroup = ({ items, value, onChange }: Props) => {
  const handleChange = (value: string) => {
    console.log({ value });
    if (onChange) onChange(value);
  };

  return (
    <RadixRadioGroup.Root
      className="radio-group"
      value={value}
      onValueChange={handleChange}>
      {items.map(({ label, value }) => (
        <div key={value}>
          <RadixRadioGroup.Item
            value={value}
            id={value}
            className="item">
            <RadixRadioGroup.Indicator className="indicator" />
          </RadixRadioGroup.Item>
          <Label htmlFor={value}>{label}</Label>
        </div>
      ))}
    </RadixRadioGroup.Root>
  );
};
