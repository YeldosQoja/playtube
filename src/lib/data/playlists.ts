import { Playlist } from "@/types/playlist";

export const getPlaylists = async (): Promise<Playlist[]> => {
  const response = await fetch("playlists");

  const data = await response.json();

  return data.playlists;
};
