/**
 * Round a number to the nearest floor precision step
 * @example roundTo(163,5) -> 165
 * @example roundTo(16,5) -> 15
 * @example roundTo(16,100) -> 0
 * @example roundTo(160,100) -> 200
 * @param number
 * @param precision
 */
export default function floorTo(number: number, precision: number) {
  return precision * Math.floor(number / precision);
}