import blendColors from "./blendColors";
/**
 * Color from bytes, the atom way
 * @param bytes
 * @return {string}
 */
export default function atomFileSizeColor(bytes:number){
  const max=1024*1024*1024;
  bytes=Math.min(bytes,max);
  switch (true){
    case bytes<10*1024*1024: // < 10 MO
      return blendColors("#17d32f","#d6ee00",bytes/(10*1024*1024));
    case bytes<200*1024*1024: // < 200 MO
      return blendColors("#eeba00","#ff6200",bytes/(200*1024*1024));
    default:
      return blendColors("#ff6200","#b2001f",bytes/max);
  }
}
