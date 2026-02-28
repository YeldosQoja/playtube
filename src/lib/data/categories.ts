import { cookies } from "next/headers";
import { VideoCategory } from "@/types/video";

const API_BASE_URL = process.env["API_BASE_URL"];

export const getVideoCategories = async (): Promise<VideoCategory[]> => {
  const cookieStore = await cookies();
  const response = await fetch(API_BASE_URL + "videos/categories", {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  return await response.json();
};
