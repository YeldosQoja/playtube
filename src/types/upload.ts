export type MultipartUploadDTO = {
  uploadId: string;
  videoId: string;
};

export type UploadPart = {
  PartNumber: number;
  ETag: string;
};

export type UploadURL = {
    url: string;
    PartNumber: number;
}