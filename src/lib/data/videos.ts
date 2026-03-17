import { Video } from "@/types/video";
import { cookies } from "next/headers";

const API_BASE_URL = process.env["API_BASE_URL"];

export const getVideos = async (): Promise<Video[]> => {
  const cookieStore = await cookies();
  const response = await fetch(API_BASE_URL + "videos", {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  const data = await response.json();

  return data.videos;
};

export const getVideoByKey = async (key: string): Promise<Video> => {
  const cookieStore = await cookies();
  const response = await fetch(API_BASE_URL + `videos/${key}`, {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  const data = await response.json();

  return data.data;
};
