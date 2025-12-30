/**
 * Copy text to clipboard
 * @param text
 * @param cb callback(success)
 */
export default function copyClipboard(
  text: string,
  cb: (success: boolean) => void = () => { }
): void {
  if (!navigator.clipboard?.writeText) {
    cb(false);
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => cb(true))
    .catch(() => cb(false));
}
