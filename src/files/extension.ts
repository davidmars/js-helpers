/**
 * From file or filename return the extension or an empty string
 * @param file
 * @param dot add dot or not
 */
export default function extension(file: string | Blob, dot = false) {
  const prefix = dot ? "." : "";
  let fileName = "";
  if (file instanceof Blob) {
    fileName = (file as File).name;
  } else {
    fileName = String(file);
  }
  fileName = fileName ? fileName : "";
  const res = fileName.match(/\.([a-z0-9A-Z]+)$/);
  if (res !== null) {
    return prefix + res[1];
  }
  return "";
}
