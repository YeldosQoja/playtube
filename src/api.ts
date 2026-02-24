import {
  QueryClient,
  useMutation,
  useQuery,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import {
  completeMultipartUpload,
  simpleUploadFile,
  startMultipartUpload,
  startSimpleUpload,
  uploadPart,
} from "./api/upload";
import { useRetry } from "./hooks/useRetry";
import type { MultipartUploadDTO, UploadURL } from "./types/upload";

export const queryClient = new QueryClient();

export const useAuth = () =>
  useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("auth/me");
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }

      return await response.json();
    },
    retry: false,
  });

export const useMultipartUpload = (): [
  UseMutationResult<string, Error, File, unknown>,
  number,
] => {
  const [progress, setProgress] = useState(0);
  const totalBytes = useRef(0);
  const uploadedBytes = useRef<number[] | null>(null);

  const onProgress = useCallback((partNumber: number, loaded: number) => {
    if (!uploadedBytes.current) return;
    uploadedBytes.current[partNumber - 1] = loaded;
    const totalUpload = uploadedBytes.current.reduce((acc, cur) => acc + cur, 0);
    setProgress(Math.floor((totalUpload / totalBytes.current) * 100));
  }, []);

  const uploadPartWithRetry = useRetry(uploadPart);
  const mutation = useMutation({
    mutationFn: async (videoFile: File) => {
      totalBytes.current = videoFile.size;

      const response = await startMultipartUpload(videoFile);
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }

      const { urls, videoId, uploadId } = (await response.json()) as MultipartUploadDTO & {
        urls: UploadURL[];
      };
      const bytes = await videoFile.arrayBuffer();
      const partSize = 20_000_000;
      uploadedBytes.current = urls.map(() => 0);

      const uploadPromises = urls.map((url, idx: number) =>
        uploadPartWithRetry(
          {
            ...url,
            body: bytes.slice(idx * partSize, idx * partSize + partSize),
          },
          onProgress,
        ),
      );

      const results = await Promise.all(uploadPromises);

      await completeMultipartUpload({
        uploadId,
        videoId,
        parts: results,
      });

      return videoId;
    },
  });

  return [mutation, progress];
};

export const useSimpleUpload = (): [
  UseMutationResult<string, Error, File, unknown>,
  number,
] => {
  const [progress, setProgress] = useState(0);

  const onProgress = useCallback((loaded: number, total: number) => {
    setProgress(Math.floor((loaded / total) * 100));
  }, []);

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const response = await startSimpleUpload(file);
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }

      const { url, key } = (await response.json()) as {
        url: string;
        key: string;
      };

      await simpleUploadFile(url, file, onProgress);

      return key;
    },
  });

  return [mutation, progress];
};

export const useCreateVideo = () =>
  useMutation({
    mutationFn: async (values: object) => {
      const response = await fetch("videos/create", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("something gone wrong");
      }

      return await response.json();
    },
  });

export const useGetVideoByKey = (key: string) =>
  useQuery({
    queryKey: ["videos", key],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`videos/${queryKey[1]}`);
      if (!response.ok) {
        throw new Error(`Couldn't get a video with key ${key}`);
      }

      return await response.json();
    },
  });
