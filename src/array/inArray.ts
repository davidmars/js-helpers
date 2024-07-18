/**
 * Is needle in haystack ?
 * @param needle
 * @param haystack
 */
export default function inArray(needle: any, haystack: any[]) {
  return haystack.indexOf(needle) > -1;
}
