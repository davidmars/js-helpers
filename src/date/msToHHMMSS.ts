/**
 * Converts milliseconds in HH:MM:SS string
 * @param ms Milliseconds
 */
export default function msToHHMMSS(ms: number) {
  return new Date(ms).toISOString().slice(11, 19)   // HH:MM:SS
}
