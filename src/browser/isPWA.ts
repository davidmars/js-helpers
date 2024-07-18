/**
 * Are we in PWA ?
 */
export default function isPWA() {
  const res = window.matchMedia('(display-mode: standalone)');
  return res.matches
}
