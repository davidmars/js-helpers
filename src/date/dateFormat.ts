/**
 *
 * @param date
 * @param fmt
 * @param localeCode
 * @see https://date-fns.org/v2.30.0/docs/format
 */
export default function dateFormat(date: Date, localeCode = "en", fmt: Intl.DateTimeFormatOptions | null = null) {
  if (!fmt) {
    fmt = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hourCycle: "h24",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  }
  return date.toLocaleString(localeCode, fmt);
}
