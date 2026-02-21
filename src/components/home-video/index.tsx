import { Video } from "@/types/video";
import "./styles.css";
import { getRelativeTime } from "@/utils/datetime";

type Props = {
  video: Video;
};

export const HomeVideo = ({
  video: { id, title, thumbnail, createdAt, channel },
}: Props) => {
  return (
    <article key={id}>
      <div className="video-thumbnail-container">
        <img
          src={thumbnail}
          alt={title}
          width={640}
          height={360}
          className="video-thumbnail"
        />
      </div>
      <div className="video-details">
        <a href="">
          <img
            src={channel.avatar}
            alt={channel.name}
            width={48}
            height={48}
            className="video-author-avatar"
          />
        </a>
        <div className="video-info">
          <h3 className="video-title">
            {title} {title} {title}
          </h3>
          <a
            href=""
            className="video-author-name">
            {channel.name}
          </a>
          <div className="video-meta">
            <span>345k views</span>
            <span>•</span>
            <span>{getRelativeTime(createdAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
