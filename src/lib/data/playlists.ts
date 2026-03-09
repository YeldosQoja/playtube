import { cookies } from "next/headers";
import { Playlist } from "@/types/playlist";

const API_BASE_URL = process.env["API_BASE_URL"];

export const getPlaylists = async (): Promise<Playlist[]> => {
  const cookieStore = await cookies();
  const response = await fetch(API_BASE_URL + "playlists", {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  const data = await response.json();

  return data.playlists;
};
