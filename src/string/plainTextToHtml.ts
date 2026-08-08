import replaceLineBreaks from "./replaceLineBreaks";

const HTML_TEXT_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
};

/**
 * Convertit un texte brut en fragment HTML sans interpréter son contenu.
 *
 * Les caractères réservés sont échappés et chaque saut de ligne, quel que
 * soit son format de plateforme, devient un `<br>`.
 */
export default function plainTextToHtml(value: string): string {
  const escaped = value.replace(/[&<>"']/g, (character) => (
    HTML_TEXT_ENTITIES[character]
  ));
  return replaceLineBreaks(escaped, "<br>");
}
