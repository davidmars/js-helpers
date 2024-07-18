/**
 * Returns the first level path
 * @param filePath a file name a file path
 */
export default function rootPathName(filePath: string) {
  return filePath.split("/")[0];
}
