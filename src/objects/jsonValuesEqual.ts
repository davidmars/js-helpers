/** Compare deux valeurs sérialisables sans dépendre de leur identité mémoire. */
export default function jsonValuesEqual(first: unknown, second: unknown): boolean {
  try {
    return JSON.stringify(first) === JSON.stringify(second);
  } catch {
    return false;
  }
}
