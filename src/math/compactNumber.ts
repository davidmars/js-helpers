/**
 * converts 25648 into 25k
 * @param number
 */
export default function compactNumber(number: number) {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 0
  }).format(number);
}
