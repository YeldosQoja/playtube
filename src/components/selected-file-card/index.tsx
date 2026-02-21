import "./styles.css";
import React from "react";
import { formatFileSize } from "@/utils/files";
import { X } from "lucide-react";

type Props = {
  filename: string;
  size: number;
  style?: "contained" | "outlined";
  iconContainerStyle?: "primary" | "gray";
  renderIcon?: () => React.ReactElement;
  onRemove?: () => void;
};

export const SelectedFileCard = ({
  filename,
  size,
  style,
  iconContainerStyle,
  renderIcon,
  onRemove,
}: Props) => {
  return (
    <div className={`selected-file-card ${style}`}>
      <div className={`icon-container ${iconContainerStyle}`}>
        {renderIcon ? renderIcon() : null}
      </div>
      <div className="details">
        <div className="name">{filename}</div>
        <div className="size">{formatFileSize(size)}</div>
      </div>
      <button
        className="remove-button"
        onClick={onRemove}>
        <X size={18} />
      </button>
    </div>
  );
};
