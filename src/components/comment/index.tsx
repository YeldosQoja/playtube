import { ThumbsDown, ThumbsUp } from "lucide-react";
import "./styles.css";

type Props = {
  username: string;
  date: string;
  text: string;
  avatarUrl: string;
};

export const Comment = ({ username, text, avatarUrl, date }: Props) => {
  return (
    <div className="comment">
      <a href="">
        <img
          className="comment__avatar"
          src={avatarUrl}
          alt=""
        />
      </a>
      <div className="comment__details">
        <div className="comment__top-row">
          <a
            href=""
            className="comment__author">{`@${username}`}</a>
          <span className="comment__date">{date}</span>
        </div>
        <p className="comment__content">{text}</p>
        <div className="comment__actions">
          <button className="comment__action-btn">
            <ThumbsUp />
          </button>
          <button className="comment__action-btn">
            <ThumbsDown />
          </button>
          <button className="comment__action-btn">Reply</button>
        </div>
      </div>
    </div>
  );
};
