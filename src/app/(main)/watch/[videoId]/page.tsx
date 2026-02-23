import "./styles.css";
import { Share2, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import comments from "@/comments.json";
import { Button, Comment } from "@/components";
import videos from "@/videos.json";
import { VideoCardCompact } from "@/components/video-card/compact";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Video() {
  const isMobile = useIsMobile(1152);

  return (
    <div className="video flow-content">
      <video
        className="video__player"
        controls
        src={`http://localhost:3000/videos/local/theoffice.mp4`}
      />
      <h1 className="video__title">
        Video Title Will Go Here Video Title Will Go Here Video Title Will Go
        Here Video Title Will Go Here Video Title Will Go Here
      </h1>
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
          consequuntur nulla tenetur nesciunt sapiente cum impedit vero placeat
          culpa fuga ab, dignissimos delectus velit dolorem sint voluptatibus,
          similique perferendis cumque consectetur itaque totam! Nihil
          voluptates nostrum at est ullam vitae voluptate commodi, non odit
          voluptatem totam dolor fugiat eaque deserunt impedit! Sapiente, quo!
          Eos, quidem. Quis suscipit quasi veniam libero rem, sint a et ipsum,
          iure ad architecto esse iste quod sed, dolore natus eos laborum? Odit
          dolore, rerum similique accusamus ad, iste debitis provident, numquam
          repudiandae labore reiciendis natus praesentium! Odio deleniti
          pariatur, quaerat molestiae in cupiditate molestias amet, voluptate
          corrupti exercitationem laborum sequi nostrum sint adipisci, delectus
          voluptatibus iusto! Assumenda quae doloremque culpa neque natus hic.
          Ipsa, assumenda eligendi. Praesentium in veritatis asperiores velit?
          Natus possimus labore laborum iure consequuntur id, enim reiciendis
          assumenda reprehenderit rerum consequatur, saepe, earum ad
          perspiciatis eaque eius error officiis molestias blanditiis
          perferendis non sed corporis fuga quos. Sed enim pariatur quibusdam!
          Eius sint velit, repudiandae mollitia fuga nostrum doloremque! Quam
          suscipit est vero sunt maxime incidunt beatae? Quae quo temporibus
          illum corporis natus in aut, vero, rerum aliquam explicabo deleniti
          iure rem alias, placeat ullam unde non optio maxime reiciendis impedit
          quibusdam.
        </p>
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
          {videos.map((video) => (
            <li key={video.id}>
              <VideoCardCompact
                video={video}
                thumbnailLeft={!isMobile}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
