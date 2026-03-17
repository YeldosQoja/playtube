import "./styles.css";
import { Share2, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import comments from "@/comments.json";
import { Button, Comment } from "@/components";
import { VideoCardCompact } from "@/components/video-card/compact";
import { getVideoByKey } from "@/lib/data/videos";

export default async function Video({ params }: PageProps<"/watch/[key]">) {
  const { key } = await params;
  const video = await getVideoByKey(key);

  const { title, desc, videoUrl } = video;

  return (
    <div className="video flow-content">
      <video
        className="video__player"
        controls
        src={videoUrl}
      />
      <h1 className="video__title">{title}</h1>
      <div className="video__details">
        <div className="video__channel">
          <a href="">
            <img
              src=""
              className="video__channel-avatar"
            />
          </a>
          <div className="video__channel-info">
            <a
              className="video__channel-name"
              href="">
              yeldos qoja
            </a>
            <p className="video__sub-count">365k subscribers</p>
          </div>
          <Button
            title="Subscribe"
            className="video__sub-btn"
          />
        </div>
        <div className="video__actions">
          <div className="video__btn-group">
            <div>
              <button className="video__action-btn">
                <ThumbsUp size={20} />
                432
              </button>
            </div>
            <div>
              <button className="video__action-btn">
                <ThumbsDown size={20} />
              </button>
            </div>
          </div>
          <button className="video__action-btn">
            <Share2 size={20} />
            Share
          </button>
          <button className="video__action-btn">
            <Star size={20} />
            Save
          </button>
        </div>
      </div>
      <div className="video__desc">
        <p>{desc}</p>
      </div>
      <div className="video__comments">
        <h2>{`${comments.length} comments`}</h2>
        <ul className="video__comments-list">
          {comments.map((comment, idx) => (
            <li key={idx}>
              <Comment {...comment} />
            </li>
          ))}
        </ul>
      </div>
      <div className="video__related">
        <ul className="video__related-list">
          {[].map((video, idx) => (
            <li key={idx}>
              <VideoCardCompact
                video={video}
                thumbnailLeft={true}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
