/**
 * Copy text to clipboard
 * @param text
 * @param text - Texte à copier
 * @param cb - Callback appelé avec `true` si la copie réussit, sinon `false`
 */
export default function copyClipboard(
  text: string,
  cb: (ok: boolean) => void = () => {}
): void {
  navigator.clipboard
    .writeText(text)
    .then(() => cb(true))
    .catch(() => cb(false));
}
