export default function isDesktop() {
  if (/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
    return false
  }
  return true;
}
