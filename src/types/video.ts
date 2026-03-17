import { Channel } from "./channel";

export type Video = {
  id: number;
  title: string;
  desc: string;
  key: string;
  videoUrl: string;
  thumbnailUrl: string;
  author: Channel;
  viewCount: number;
  createdAt: string | Date;
  duration: number;
  preview: string;
};

export interface UploadVideoForm {
  title: string;
  desc: string;
  playlist: string;
  category: string;
  audience: string;
  ageRestriction: string;
  privacy: string;
  allowComments: boolean;
  allowDownloads: boolean;
  tags: string;
}

export type VideoCategory = {
  id: number;
  title: string;
};
