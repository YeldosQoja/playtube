import { apiFetch } from "@/services/api-fetch";
import type { MultipartUploadDTO, UploadPart, UploadURL } from "@/types/upload";

export type SimpleUploadDTO = {
  url: string;
  videoId: string;
};

type UploadPartBody = ArrayBuffer;

export class UploadService {
  async startSimpleUpload(file: File): Promise<Response> {
    return apiFetch("upload", {
      method: "POST",
      body: JSON.stringify({
        contentType: file.type,
      }),
    });
  }

  async simpleUploadFile(
    url: string,
    file: File,
    onProgress?: (loaded: number, total: number) => void,
  ): Promise<void> {
    await this.putWithProgress(url, file, onProgress);
  }

  async startMultipartUpload(videoFile: File, key: string): Promise<Response> {
    return apiFetch("upload/multipart/start", {
      method: "POST",
      body: JSON.stringify({
        contentType: videoFile.type,
        fileSize: videoFile.size,
        key,
      }),
    });
  }

  async completeMultipartUpload(
    data: MultipartUploadDTO & { parts: UploadPart[] },
  ): Promise<Response> {
    return apiFetch("upload/multipart/complete", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async abortMultipartUpload(data: MultipartUploadDTO): Promise<Response> {
    return apiFetch("upload/multipart/abort", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async uploadPart(
    { url, PartNumber, body }: UploadURL & { body: UploadPartBody },
    onProgress?: (partNumber: number, loaded: number, total: number) => void,
  ): Promise<UploadPart> {
    const xhr = await this.putWithProgress(url, body, (loaded, total) => {
      if (onProgress) {
        onProgress(PartNumber, loaded, total);
      }
    });

    const etagHeader = xhr.getResponseHeader("etag");

    if (!etagHeader) {
      throw new Error("Missing ETag header in upload part response");
    }

    const ETag = etagHeader.startsWith("\"")
      ? (JSON.parse(etagHeader) as string)
      : etagHeader;

    return { ETag, PartNumber };
  }

  private putWithProgress(
    url: string,
    body: XMLHttpRequestBodyInit,
    onProgress?: (loaded: number, total: number) => void,
  ): Promise<XMLHttpRequest> {
    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onerror = (error) => {
        reject(error);
      };

      xhr.onabort = (event) => {
        reject(new Error(`The request has been aborted at ${event.loaded} bytes`));
      };

      xhr.ontimeout = () => {
        reject(new Error("Request timed out"));
      };

      xhr.upload.onprogress = (event) => {
        if (onProgress) {
          onProgress(event.loaded, event.total);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };

      xhr.open("PUT", url, true);
      xhr.send(body);
    });
  }
}

export const uploadService = new UploadService();
