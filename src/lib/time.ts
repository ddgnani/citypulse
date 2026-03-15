/**
 * Returns the current local time formatted for display in the given IANA timezone.
 * Example: "2:30 PM"
 */
export function getLocalTime(timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}
