/**
 * Truncates a string to a specified maximum length and appends an ellipsis if necessary.
 * @param str
 * @param maxLength
 * @param ellipsis
 */
export function ellipsis(str: string, maxLength: number,ellipsis="..."): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}
