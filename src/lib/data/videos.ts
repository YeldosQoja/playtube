import { Video } from "@/types/video";
import { fetch } from "../fetch.interceptor";

export const getVideos = async (): Promise<Video[]> => {
  const response = await fetch("video/list");

  const data = await response.json();

  return data.videos;
};

export const getVideoByKey = async (key: string): Promise<Video> => {
  const response = await fetch(`video/${key}`);

  const data = await response.json();

  return data.data;
};
