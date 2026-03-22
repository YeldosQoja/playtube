"use client";

import "./styles.css";
import "@videojs/react/video/skin.css";
import { createPlayer, videoFeatures } from "@videojs/react";
import { VideoSkin } from "@videojs/react/video";
import { HlsVideo } from "@videojs/react/media/hls-video";

const Player = createPlayer({ features: videoFeatures });

interface Props {
  src: string;
}

export const VideoPlayer = ({ src }: Props) => {
  return (
    <Player.Provider>
      <VideoSkin>
        <HlsVideo
          className="video-player"
          src={src}
          crossOrigin="use-credentials"
          playsInline
        />
      </VideoSkin>
    </Player.Provider>
  );
};
