import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const getRelativeTime = (date: string | Date) => dayjs(date).fromNow();

export const formatDuration = (seconds: number) =>
  dayjs
    .duration(seconds, "seconds")
    .format("HH:mm:ss");
