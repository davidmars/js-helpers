/**
 * Round a number to the nearest precision step
 * @example roundTo(163,5) -> 165
 * @example roundTo(16,5) -> 15
 * @example roundTo(16,100) -> 0
 * @example roundTo(160,100) -> 200
 * @param num
 * @param precision
 */
export default function roundTo(num: number, precision: number) {
  return Math.round((num + Number.EPSILON) * precision) / precision
}

