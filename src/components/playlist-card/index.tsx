import "./styles.css";
import { ListVideoIcon } from "lucide-react";
import { getRelativeTime } from "@/utils/datetime";
import { Playlist } from "@/types/playlist";

type Props = {
  playlist: Playlist;
};

export const PlaylistCard = ({ playlist }: Props) => {
  const { title, lastUpdatedAt } = playlist;
  return (
    <div className="playlist-card flow-content">
      <div className="thumbnail">
        <img
          src=""
          alt=""
          className="thumbnail__img"
        />
        <div className="thumbnail__foreground">
          <ListVideoIcon size={28} />
          <span>54</span>
        </div>
      </div>
      <h3 className="playlist-card__title">{title}</h3>
      <span className="playlist-card__updated-time">
        {getRelativeTime(lastUpdatedAt)}
      </span>
    </div>
  );
};
