import { ActionState } from "@/types/action-state";

const API_BASE_URL = process.env["API_BASE_URL"];

export async function saveVideo(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const key = formData.get("key");
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
      category: formData.get("category"),
      audience: formData.get("audience"),
      ageRestriction: formData.get("ageRestriction"),
      allowComments: formData.get("allowComments"),
      allowDownloads: formData.get("allowDownloads"),
      tags: formData.get("tags"),
    }),
  });

  if (!response.ok) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: `Unable to save video metadata.`,
    };
  }

  return { isSubmitted: true, isSuccess: true, msg: "Video metadata saved." };
}
