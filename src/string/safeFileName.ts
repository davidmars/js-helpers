/**
 * Renvoie un nom de fichier dont on a remplacé tous les charactères non courrants et les espaces
 * @param fileName
 */
export function safeFileName(fileName:string){
    fileName = fileName.replaceAll(/[/\\?%*:|"<>\s]/g, '-');
    fileName = fileName.replaceAll(/-{2,}/g, "-");
    fileName = fileName.replaceAll(/-{2,}/g, "-");
    fileName = fileName.replaceAll(/-{2,}/g, "-");
    return fileName
}