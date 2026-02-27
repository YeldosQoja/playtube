import { videosService } from "@/services/videos.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateDraftVideo = () => {
  return useMutation({
    mutationFn: async (payload: unknown) => {
      const response = await videosService.createVideo(payload);
      return response.key as string;
    },
  });
};
