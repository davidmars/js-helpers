/**
 * Remplace chaque saut de ligne, quel que soit son format de plateforme.
 * Un CRLF constitue un seul saut ; deux sauts consécutifs produisent deux remplacements.
 */
export default function replaceLineBreaks(value: string, replacement: string): string {
  return value.replace(/\r\n|\r|\n/g, replacement);
}
