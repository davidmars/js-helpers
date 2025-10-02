/**
 * Clamp a number between a minimum and maximum value
 * @param num The number to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clamped number
 */
export default function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
