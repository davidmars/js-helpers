import roundTo from "../math/roundTo";

/**
 * Return mega bytes per seconds
 * @param bytes
 * @param milliseconds
 */
export default function mbps(bytes:number,milliseconds:number){
  const mbps=(bytes * 8 / ((1 / Math.pow(10, 3)) * milliseconds)) / Math.pow(10, 6);
  return roundTo(mbps,0.01);
}
