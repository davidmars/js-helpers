/**
 * Convertit une string en objet Date, gère le format "YYYY-MM-DD HH:mm:ss"
 */
function str2date(dateStr: string): Date | null {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (regex.test(dateStr)) {
    // Remplacer l'espace par un 'T' pour compatibilité ISO
    const isoDateStr = dateStr.replace(" ", "T");
    const d = new Date(isoDateStr);
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

/**
 *
 * @param date
 * @param fmt
 * @param localeCode
 * @see https://date-fns.org/v2.30.0/docs/format
 */
export default function dateFormat(
  date: Date | string,
  localeCode = "en",
  fmt: Intl.DateTimeFormatOptions | null = null
) {
  // Si date est une string, la convertir en Date
  if (typeof date === "string") {
    const parsed = str2date(date);
    if (!parsed) return "";
    date = parsed;
  }
  return date.toLocaleString(localeCode, fmt || {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hourCycle: "h24",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
