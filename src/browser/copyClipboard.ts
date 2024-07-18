/**
 * Copy text to clipboard
 * @param text
 */
export default function copyClipboard(text: string) {
  navigator.clipboard.writeText(text).then();
}
