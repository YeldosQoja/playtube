import { apiFetch } from "@/services/api-fetch";

export class VideosService {
  async getUploadedVideos() {
    const response = await apiFetch("videos", {});
    if (!response.ok) {
      throw new Error(`Failed to fetch uploaded videos: ${response.status}`);
    }

    return await response.json();
  }

  async createVideo(payload: unknown) {
    const response = await apiFetch("videos", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create video: ${response.status}`);
    }

    return await response.json();
  }

  async getVideoByPublicKey(publicKey: string) {
    const response = await apiFetch(`videos/${publicKey}`, {});
    if (!response.ok) {
      throw new Error(`Failed to fetch video ${publicKey}: ${response.status}`);
    }

    return await response.json();
  }

  async getCommentsByVideoPublicKey(
    publicKey: string,
    params: { limit: number; offset?: number },
  ) {
    const searchParams = new URLSearchParams({
      limit: String(params.limit),
      offset: String(params.offset ?? 0),
    });

    const response = await apiFetch(
      `videos/${publicKey}/comments?${searchParams.toString()}`,
      {},
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch comments for ${publicKey}: ${response.status}`);
    }

    return await response.json();
  }

  async updateVideoByPublicKey(publicKey: string, payload: unknown) {
    const response = await apiFetch(`videos/${publicKey}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update video ${publicKey}: ${response.status}`);
    }

    return await response.json();
  }

  async deleteVideoByPublicKey(publicKey: string) {
    const response = await apiFetch(`videos/${publicKey}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete video ${publicKey}: ${response.status}`);
    }

    return await response.json();
  }
}

export const videosService = new VideosService();
