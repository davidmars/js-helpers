/**
 * According mime type returns an appropriate material design icon identifier
 * @param mime
 */
export default function mimeToMdi(mime:string){
  let ret="mdi-file-document-outline";
  switch (true) {
    case mime.match(/pdf/)!==null:
      ret="mdi-file-pdf-outline";
      break;
    case mime.match("image")!==null:
      ret="mdi-image";
      break;
    case mime.match("excel")!==null:
    case mime.match("spreadsheet")!==null:
      ret="mdi-file-excel-outline";
      break;
    case mime.match("word")!==null:
    case mime.match("document")!==null:
    case mime.match("rtf")!==null:
      ret="mdi-file-word-outline";
      break;
    case mime.match("video")!==null:
      ret="mdi-file-video-outline";
      break;
    case mime.match("audio")!==null:
      ret="mdi-file-music-outline";
      break;
    case mime.match("zip")!==null:
    case mime.match("x-tar")!==null:
      ret="mdi-folder-zip-outline";
      break;
  }

  return ret;
}
