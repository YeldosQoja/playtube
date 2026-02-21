import "./styles.css";
import { VideoCardSearch } from "@/components/video-card/search";
import videos from "@/videos.json";

const Search = () => {
  return (
    <div className="search">
      <div className="container flow-content">
        {videos.map((video) => (
          <VideoCardSearch
            key={video.id}
            video={video}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
