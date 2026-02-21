import "./styles.css";
import { ImgHTMLAttributes } from "react";
import { formatDuration } from "@/utils/datetime";

interface VideoThumbnailProps extends ImgHTMLAttributes<HTMLImageElement> {
  duration: number;
};

export const VideoThumbnail = ({ duration, className, ...rest }: VideoThumbnailProps) => {
  return (
    <div className="video-thumbnail">
      <img
        className={`video-thumbnail__img ${className ?? ''}`}
        {...rest}
      />
      <div className="video-thumbnail__duration">
        <span>{formatDuration(duration)}</span>
      </div>
    </div>
  );
};
