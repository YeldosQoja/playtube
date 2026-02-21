import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";

type Option = {
  key: string;
  label: string;
};

type Props = {
  options: Option[];
  selectedKey: string;
  onChange?: (key: string) => void;
};

export const Dropdown = ({ selectedKey, options, onChange }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex justify-between items-center bg-transparent text-gray-950 text-base font-medium rounded-md border-2 border-gray-100 px-2 py-1.5">
          {options.find((o) => o.key === selectedKey)?.label ?? ""}
          <ChevronDown
            size={22}
            className="text-gray-950"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={5}
          align="start"
          className="bg-white w-[--radix-dropdown-menu-trigger-width] flex flex-col rounded-md shadow-xl will-change-[transform,opacity] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade p-1">
          {options.map((o) => (
            <DropdownMenuItem
              key={o.key}
              asChild>
              <button
                onClick={() => {
                  if (onChange) {
                    onChange(o.key);
                  }
                }}
                className="bg-transparent flex items-center text-sm text-gray-950 hover:bg-gray-100 hover:outline-none border-0 rounded-none p-1.5 select-none text-left">
                <Check
                  size={18}
                  className="text-gray-900 mr-2"
                  color={o.key !== selectedKey ? "transparent" : undefined}
                />
                {o.label}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
