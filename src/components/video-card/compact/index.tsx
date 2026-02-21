import "./styles.css";
import { Video } from "@/types/video";
import { getRelativeTime } from "@/utils/datetime";
import { VideoThumbnail } from "../video-thumbnail";

type Props = {
  video: Video;
  displaysChannel?: boolean;
  thumbnailLeft?: boolean;
};

export const VideoCardCompact = ({
  video,
  displaysChannel,
  thumbnailLeft,
}: Props) => {
  const { thumbnail, duration, channel, title, createdAt, viewCount } = video;
  return (
    <div
      className={`video-card-compact${
        thumbnailLeft ? " video-card--row" : ""
      }`}>
      <VideoThumbnail
        src={thumbnail}
        className="thumbnail"
        duration={duration}
      />
      <div className="info">
        <h3 className="title">
          {title} {title} {title}
        </h3>
        {displaysChannel || displaysChannel === undefined ? (
          <a
            href=""
            className="channel-name">
            {channel.name}
          </a>
        ) : null}
        <div className="meta">
          <span>{viewCount} views</span>
          <span>•</span>
          <span>{getRelativeTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
