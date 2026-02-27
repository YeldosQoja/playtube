"use server";

import { ActionState } from "@/types/action-state";

const API_BASE_URL = process.env["API_BASE_URL"];

export async function saveVideo(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const key = formData.get("key");
  const isForKids = formData.get("audience") === "for-kids";
  const isAgeRestricted = formData.get("ageRestriction") === "age-restriction";
  const response = await fetch(API_BASE_URL + `videos/${key}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      title: formData.get("title"),
      desc: formData.get("desc"),
      playlist: formData.get("playlist"),
      thumbnailKey: formData.get("thumbnailKey"),
      category: formData.get("category"),
      isForKids,
      isAgeRestricted,
      allowComments: formData.get("allowComments"),
      allowDownloads: formData.get("allowDownloads"),
      tags: formData.get("tags"),
    }),
  });

  if (!response.ok) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: await response.json(),
    };
  }

  return { isSubmitted: true, isSuccess: true, msg: "Video metadata saved." };
}
