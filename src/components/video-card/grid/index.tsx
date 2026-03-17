import "./styles.css";
import { Video } from "@/types/video";
import { VideoThumbnail } from "../video-thumbnail";
import { getRelativeTime } from "@/utils/datetime";

type Props = {
  video: Video;
};

export const VideoCardGrid = ({ video }: Props) => {
  const { thumbnailUrl, duration, author, title, createdAt, viewCount } = video;
  return (
    <div className="video-card">
      <VideoThumbnail
        src={thumbnailUrl}
        duration={duration}
      />
      <div className="video-card__details">
        <a href="">
          <img
            src={author.avatar}
            alt={author.username}
            width={48}
            height={48}
            className="video-card__channel-avatar"
          />
        </a>
        <div className="video-card__info">
          <h3 className="video-card__title">
            {title} {title} {title}
          </h3>
          <a
            href=""
            className="video-card__channel-name">
            {author.username}
          </a>
          <div className="video-card__meta">
            <span>{viewCount} views</span>
            <span>•</span>
            <span>{getRelativeTime(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
