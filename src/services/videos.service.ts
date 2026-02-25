type QueryValue = string | number | boolean | undefined | null;

export type CreateVideoPayload = {
  title: string;
  desc: string;
  storageKey: string;
  thumbnailStorageKey: string;
  playlist: string;
  category: string;
  isForKids: boolean;
  isAgeRestricted: boolean;
  allowComments: boolean;
  allowDownloads: boolean;
  tags: string;
};

export type UpdateVideoPayload = {
  title: string;
  desc: string;
};

export type MessageResponse = {
  msg: string;
};

export type UploadedVideosResponse<TVideo = unknown> = {
  videos: TVideo[];
};

export type VideoCommentsResponse<TComment = unknown> = {
  msg: string;
  comments: TComment[];
};

export type VideoDetailsResponse<TVideo = unknown> = {
  data: TVideo;
};

export class VideosService {
  private readonly baseUrl: string;

  constructor(
    baseUrl = process.env["API_BASE_URL"] ?? process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "",
  ) {
    this.baseUrl = baseUrl;
  }

  async getUploadedVideos<TVideo = unknown>(): Promise<UploadedVideosResponse<TVideo>> {
    return this.requestJson<UploadedVideosResponse<TVideo>>("videos");
  }

  async createVideo(payload: CreateVideoPayload): Promise<MessageResponse> {
    return this.requestJson<MessageResponse>("videos/create", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: this.getJsonHeaders(),
    });
  }

  async getVideoByPublicKey<TVideo = unknown>(
    publicKey: string,
  ): Promise<VideoDetailsResponse<TVideo>> {
    return this.requestJson<VideoDetailsResponse<TVideo>>(`videos/${publicKey}`);
  }

  async getCommentsByVideoPublicKey<TComment = unknown>(
    publicKey: string,
    params: { limit: number; offset?: number },
  ): Promise<VideoCommentsResponse<TComment>> {
    return this.requestJson<VideoCommentsResponse<TComment>>(
      `videos/${publicKey}/comments`,
      {
        query: {
          limit: params.limit,
          offset: params.offset ?? 0,
        },
      },
    );
  }

  async updateVideoByPublicKey(
    publicKey: string,
    payload: UpdateVideoPayload,
  ): Promise<MessageResponse> {
    return this.requestJson<MessageResponse>(`videos/${publicKey}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: this.getJsonHeaders(),
    });
  }

  async deleteVideoByPublicKey(publicKey: string): Promise<MessageResponse> {
    return this.requestJson<MessageResponse>(`videos/${publicKey}`, {
      method: "DELETE",
    });
  }

  private async requestJson<T>(
    path: string,
    options: RequestInit & { query?: Record<string, QueryValue> } = {},
  ): Promise<T> {
    const { query, headers, ...init } = options;
    const url = this.buildUrl(path, query);

    const response = await fetch(url, {
      credentials: "include",
      ...init,
      headers,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `VideosService request failed: ${response.status} ${response.statusText} ${errorMessage}`,
      );
    }

    return (await response.json()) as T;
  }

  private buildUrl(path: string, query?: Record<string, QueryValue>): string {
    const normalizedBase = this.baseUrl.endsWith("/")
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    const url = new URL(
      normalizedBase ? `${normalizedBase}/${normalizedPath}` : `/${normalizedPath}`,
      normalizedBase ? undefined : "http://localhost",
    );

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null) continue;
        url.searchParams.set(key, String(value));
      }
    }

    return normalizedBase ? url.toString() : `${url.pathname}${url.search}`;
  }

  private getJsonHeaders(): HeadersInit {
    return {
      "content-type": "application/json",
      accept: "application/json",
    };
  }
}

export const videosService = new VideosService();
