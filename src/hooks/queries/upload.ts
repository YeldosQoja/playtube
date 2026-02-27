import { useCallback, useRef, useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRetry } from "../useRetry";
import { uploadService } from "@/services/upload.service";
import type { MultipartUploadDTO, UploadURL } from "@/types/upload";

export const useMultipartUpload = (): [
  UseMutationResult<void, Error, { file: File; key: string }, unknown>,
  number,
] => {
  const [progress, setProgress] = useState(0);
  const totalBytes = useRef(0);
  const uploadedBytes = useRef<number[] | null>(null);

  const onProgress = useCallback((partNumber: number, loaded: number) => {
    if (!uploadedBytes.current) return;
    uploadedBytes.current[partNumber - 1] = loaded;
    const totalUpload = uploadedBytes.current.reduce(
      (acc, cur) => acc + cur,
      0,
    );
    setProgress(Math.floor((totalUpload / totalBytes.current) * 100));
  }, []);

  const uploadPartWithRetry = useRetry(
    uploadService.uploadPart.bind(uploadService),
  );
  const mutation = useMutation({
    mutationFn: async ({ file, key }: { file: File; key: string }) => {
      totalBytes.current = file.size;

      const response = await uploadService.startMultipartUpload(file);
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }

      const { urls, uploadId } =
        (await response.json()) as MultipartUploadDTO & {
          urls: UploadURL[];
        };
      const bytes = await file.arrayBuffer();
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
      const completionResponse = await uploadService.completeMultipartUpload({
        uploadId,
        key,
        parts: results,
      });

      if (!completionResponse.ok) {
        throw new Error("Failed to complete multipart upload");
      }
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
      const response = await uploadService.startSimpleUpload(file);
      if (!response.ok) {
        throw new Error("Not authenticated!");
      }

      const { url, key } = (await response.json()) as {
        url: string;
        key: string;
      };

      await uploadService.simpleUploadFile(url, file, onProgress);

      return key;
    },
  });

  return [mutation, progress];
};
