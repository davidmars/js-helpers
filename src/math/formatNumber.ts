/**
 * Converts 15312 into 15 312
 * @param number
 */
export default function formatNumber(number: number) {
  return new Intl.NumberFormat().format(number)
}
