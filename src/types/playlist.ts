import { Channel } from "./channel";

export type Playlist = {
  id: number;
  title: string;
  desc: string;
  channel: Channel;
  thumbnail: string;
  videoCount: number;
  lastUpdatedAt: string;
  createdAt: string;
};
