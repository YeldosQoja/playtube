import "./styles.css";
import * as RadixProgress from "@radix-ui/react-progress";

type Props = {
  value: number;
  max: number;
};

export const Progress = ({ value, max }: Props) => {
  return (
    <RadixProgress.Root
      value={value}
      max={max}
      className="progress">
      <RadixProgress.Indicator className="progress__indicator" style={{ transform: `translateX(-${100 - value}%)` }}/>
    </RadixProgress.Root>
  );
};
