const formatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
export function formatDate(date: string) {
  return formatter.format(new Date(date));
}
