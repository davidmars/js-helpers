/**
 * Returns the/file/path/according/file/object/type.cast
 * @param file
 */
export default function filePath(file:File|any){
  if(file.webkitRelativePath){
    return file.webkitRelativePath
  }
  if(file.filepath){
    return file.filepath
  }
  if(file.path){
    return file.path
  }
  return "";
}
