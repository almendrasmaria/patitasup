const formatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatDashboardDate(date: Date): string {
  return formatter.format(date);
}
