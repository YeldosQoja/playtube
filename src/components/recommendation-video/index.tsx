import "./styles.css";
import { getRelativeTime } from "@/utils/datetime";

type Author = {
  name: string;
  avatar: string;
  bio: string;
};

type Props = {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
  createdAt: string;
  channel: Author;
};

export const RecommendationVideo = ({ title, thumbnail, createdAt, channel }: Props) => {
  return (
    <div className="video-item">
      <a href="">
        <img
          className="video-item-thumbnail"
          src={thumbnail}
          alt=""
        />
      </a>
      <div className="video-item-info">
        <h3 className="video-item-title">{title}</h3>
        <a
          href=""
          className="video-item-author-name">
          {channel.name}
        </a>
        <div>
          <span>345k views</span>
          <span>•</span>
          <span>{getRelativeTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
