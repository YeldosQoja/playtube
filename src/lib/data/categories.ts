import { VideoCategory } from "@/types/video";

export const getVideoCategories = async (): Promise<VideoCategory[]> => {
  const response = await fetch("videos/categories");

  const data = await response.json();

  return data.categories;
};
