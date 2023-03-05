import { differenceInDays } from "date-fns";

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const daysDiff = differenceInDays(date, new Date());
  if (daysDiff > -3) {
    const rtf = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });
    return rtf.format(daysDiff, "day");
  }
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formatter.format(date);
}
