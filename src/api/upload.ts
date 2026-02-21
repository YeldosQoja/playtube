import { MultipartUploadDTO, UploadPart, UploadURL } from "@/types/upload";

export type SimpleUploadDTO = {
  url: string;
  videoId: string;
};

export const startSimpleUpload = async (file: File) => {
  const response = await fetch("upload", {
    method: "POST",
    body: JSON.stringify({
      contentType: file.type,
    }),
  });
  return response;
};

export const simpleUploadFile = async (
  url: string,
  file: File,
  onProgress?: (loaded: number, total: number) => void
): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onerror = (error) => {
      reject(error);
    };

    xhr.onabort = (event) => {
      const { loaded } = event;
      reject(new Error(`The request has been aborted at ${loaded} bytes`));
    };

    xhr.ontimeout = () => {
      reject(new Error("Request timed out"));
    };

    xhr.upload.onprogress = (event) => {
      if (onProgress) onProgress(event.loaded, event.total);
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.open("PUT", url, true);

    xhr.send(file);
  });
};

export const startMultipartUpload = async (videoFile: File) => {
  const response = await fetch("upload/multipart/start", {
    method: "POST",
    body: JSON.stringify({
      contentType: videoFile.type,
      fileSize: videoFile.size,
    }),
  });
  return response;
};

export const completeMultipartUpload = async (
  data: MultipartUploadDTO & { parts: UploadPart[] }
) => {
  return await fetch("upload/multipart/complete", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const abortMultipartUpload = async (data: MultipartUploadDTO) => {
  return await fetch("upload/multipart/abort", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const uploadPart = async (
  { url, PartNumber, body }: UploadURL & { body: ArrayBuffer | Uint8Array },
  onProgress?: (partNumber: number, loaded: number, total: number) => void
) => {
  const { ETag } = await new Promise<{ ETag: string }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onerror = (error) => {
      reject(error);
    };

    xhr.onabort = (event) => {
      const { loaded } = event;
      const error = new Error(
        `The request has been aborted at ${loaded} bytes`
      );
      reject(error);
    };

    xhr.ontimeout = (error) => {
      reject(error);
    };

    xhr.upload.onprogress = (event) => {
      if (onProgress) onProgress(PartNumber, event.loaded, event.total);
    };

    xhr.onload = () => {
      const value = xhr.getResponseHeader("etag") as string;
      resolve({ ETag: JSON.parse(value) });
    };

    xhr.open("PUT", url, true);

    xhr.send(body);
  });

  return { ETag, PartNumber };
};
