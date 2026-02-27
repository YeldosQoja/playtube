import { ActionState } from "@/types/action-state";

export const saveVideo = (
  prevState: ActionState,
  formData: FormData,
): ActionState => {
  return { isSubmitted: true, isSuccess: true, msg: "Video metadata saved." };
};
