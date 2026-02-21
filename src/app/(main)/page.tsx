import "./styles.css";
import videos from "@/videos.json";
import { VideoCardGrid } from "@/components/video-card/grid";
import Link from "next/link";

const Home = () => {
  return (
    <div className="home">
      <h1>Browse</h1>
      <section className="video-grid">
        {videos.map((video) => {
          return (
            <Link
              key={video.id}
              href={`/watch/${video.id}`}>
              <VideoCardGrid
                video={video}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
