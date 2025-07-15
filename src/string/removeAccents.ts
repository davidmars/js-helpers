/**
 * Removes accents from a string (e.g., é → e, ç → c).
 * @param text The input string to normalize
 * @returns A new string without diacritics
 */
export function removeAccents(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
