"use client";

import { VideoCategory } from "@/types/video";
import { createContext, PropsWithChildren, useContext } from "react";

const CategoriesContext = createContext<VideoCategory[] | null>(null);

export const useCategories = () => {
  const categories = useContext(CategoriesContext);
  return categories ?? [];
};

export const CategoriesProvider = ({
  categories,
  children,
}: PropsWithChildren<{ categories: VideoCategory[] }>) => {
  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};
