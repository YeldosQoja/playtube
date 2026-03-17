import "./styles.css";
import { VideoCardGrid } from "@/components/video-card/grid";
import Link from "next/link";
import { getVideos } from "@/lib/data/videos";

export default async function Home() {
  const videos = await getVideos();

  return (
    <div className="home">
      <h1>Browse</h1>
      <section className="video-grid">
        {videos.map((video) => {
          return (
            <Link
              key={video.key}
              href={`/watch/${video.key}`}>
              <VideoCardGrid
                video={{
                  ...video,
                  viewCount: 3500,
                  duration: 3200,
                  preview: "",
                }}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
