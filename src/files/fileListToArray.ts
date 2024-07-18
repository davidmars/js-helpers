/**
 * Convert a FileList into a File array
 * @param fileList
 */
export default function fileListToArray(fileList:FileList){
  const r:File[]= Array.from(fileList);
  return r;
}
