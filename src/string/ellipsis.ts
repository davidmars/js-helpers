/**
 * Tronque une chaîne et ajoute "…" si elle dépasse une longueur maximale.
 *
 * - Si `maxLength` <= 0 : renvoie une chaîne vide.
 * - Si la chaîne est déjà courte : renvoie la chaîne telle quelle.
 * - Par défaut, utilise le caractère "…" (ellipsis unicode).
 *
 * @param str - Chaîne à tronquer
 * @param maxLength - Longueur maximale du résultat final (ellipsis inclus)
 * @param options - Options de personnalisation
 * @returns La chaîne tronquée (ou originale si pas besoin)
 */
export function ellipsis(
  str: string,
  maxLength: number,
  options?: {
    /** Suffixe ajouté quand on tronque (par défaut: "…") */
    suffix?: string;
    /** Si true, on supprime les espaces de fin avant d’ajouter le suffixe (par défaut: true) */
    trimEnd?: boolean;
  }
): string {
  const suffix = options?.suffix ?? "…";
  const trimEnd = options?.trimEnd ?? true;

  if (maxLength <= 0) return "";

  // Cas simple: pas besoin de tronquer
  if (str.length <= maxLength) return str;

  // Si le suffixe est plus long que maxLength, on renvoie juste une portion du suffixe
  if (suffix.length >= maxLength) return suffix.slice(0, maxLength);

  const cutLength = maxLength - suffix.length;
  let base = str.slice(0, cutLength);

  if (trimEnd) {
    base = base.replace(/\s+$/g, "");
  }

  return base + suffix;
}
