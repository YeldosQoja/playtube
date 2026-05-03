import { Video } from "@/types/video";

export const getVideos = async (): Promise<Video[]> => {
  const response = await fetch("videos");

  const data = await response.json();

  return data.videos;
};

export const getVideoByKey = async (key: string): Promise<Video> => {
  const response = await fetch(`videos/${key}`);

  const data = await response.json();

  return data.data;
};
