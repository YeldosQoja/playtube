import "./styles.css";
import * as RadixProgress from "@radix-ui/react-progress";

type Props = {
  value: number;
  max: number;
};

export const ProgressBar = ({ value, max }: Props) => {
  return (
    <RadixProgress.Root
      value={value}
      max={max}
      className="progress-bar">
      <RadixProgress.Indicator className="progress-bar__indicator" style={{ transform: `translateX(-${100 - value}%)` }}/>
    </RadixProgress.Root>
  );
};
