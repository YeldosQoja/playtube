import { VideoCategory } from "@/types/video";
import { fetch } from "../fetch.interceptor";

export const getVideoCategories = async (): Promise<VideoCategory[]> => {
  const response = await fetch("video/category/list");

  const data = await response.json();

  return data.categories;
};
