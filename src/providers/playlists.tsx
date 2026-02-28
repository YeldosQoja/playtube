"use client";

import { Playlist } from "@/types/playlist";
import { createContext, PropsWithChildren, useContext } from "react";

const PlaylistsContext = createContext<Playlist[] | null>(null);

export const usePlaylists = () => {
  const playlists = useContext(PlaylistsContext);
  return playlists ?? [];
};

export const PlaylistsProvider = ({
  playlists,
  children,
}: PropsWithChildren<{ playlists: Playlist[] }>) => {
  return (
    <PlaylistsContext.Provider value={playlists}>
      {children}
    </PlaylistsContext.Provider>
  );
};
