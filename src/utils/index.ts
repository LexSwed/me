import { differenceInDays } from "date-fns";

const formatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const daysDiff = differenceInDays(date, new Date());
  if (daysDiff > -3) {
    return rtf.format(daysDiff, "day");
  }
  return formatter.format(date);
}
