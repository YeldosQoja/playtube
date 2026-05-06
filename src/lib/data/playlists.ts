import { Playlist } from "@/types/playlist";
import { fetch } from "../fetch.interceptor";

export const getPlaylists = async (): Promise<Playlist[]> => {
  const response = await fetch("playlist/list");

  const data = await response.json();

  return data.playlists;
};
