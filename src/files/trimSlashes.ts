/**
 * Removes leading and trailing slashes
 * @param filePath
 */
export default function trimSlashes(filePath:string){
  return filePath.replace(/^\/|\/$/g, '');
}
