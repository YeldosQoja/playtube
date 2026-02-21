import "./styles.css";
import { Video } from "@/types/video";
import { VideoThumbnail } from "../video-thumbnail";
import { getRelativeTime } from "@/utils/datetime";

type Props = {
  video: Video;
};

export const VideoCardSearch = ({ video }: Props) => {
  const { thumbnail, duration, channel, title, createdAt, viewCount, desc } = video;
  return (
    <div className="video-card-search">
      <VideoThumbnail
        src={thumbnail}
        duration={duration}
      />
      <div className="details">
        <h3 className="title">{title}</h3>
        <div className="meta">
          <span>{viewCount} views</span>
          <span>•</span>
          <span>{getRelativeTime(createdAt)}</span>
        </div>
        <div className="channel-info">
          <a href="">
            <img
              src={channel.avatar}
              alt=""
              width={28}
              height={28}
              className="channel-avatar"
            />
          </a>
          <a
            href=""
            className="channel-name">
            {channel.name}
          </a>
        </div>
        <p className="desc">{desc}</p>
      </div>
    </div>
  );
};
