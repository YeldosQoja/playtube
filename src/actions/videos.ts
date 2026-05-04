"use server";

import { ActionState } from "@/types/action-state";
import z from "zod";

const VideoMetadata = z.object({
  title: z.string().trim().nonempty(),
  desc: z.string().nonempty(),
  playlist: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val);
    }
    return val;
  }, z.number().int().positive().nullish()),
  thumbnailKey: z.nanoid(),
  category: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val);
    }
    return val;
  }, z.number().int().positive().nullish()),
  audience: z.literal(["for-kids", "not-for-kids"]),
  ageRestriction: z.literal(["age-restriction", "no-age-restriction"]),
  allowComments: z.boolean(),
  allowDownloads: z.boolean(),
  tags: z.string(),
  privacy: z.literal(["public", "unlisted", "private"]),
});

export async function saveVideo(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const key = formData.get("key");
  const parsedData = VideoMetadata.safeParse({
    title: formData.get("title"),
    desc: formData.get("desc"),
    playlist: formData.get("playlist"),
    thumbnailKey: formData.get("thumbnailKey"),
    category: formData.get("category"),
    audience: formData.get("audience"),
    ageRestriction: formData.get("ageRestriction"),
    allowComments: formData.get("allowComments") === "true",
    allowDownloads: formData.get("allowDownloads") === "true",
    tags: formData.get("tags"),
    privacy: formData.get("privacy"),
  });

  if (parsedData.error) {
    return {
      isSuccess: false,
      isSubmitted: true,
      err: parsedData.error.message,
    };
  }

  const { audience, ageRestriction, ...metadata } = parsedData.data;

  const response = await fetch(`videos/${key}`, {
    method: "PUT",
    body: JSON.stringify({
      ...metadata,
      isForKids: audience === "for-kids",
      isAgeRestricted: ageRestriction === "age-restriction",
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
