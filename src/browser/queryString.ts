/**
 * Returns querystring value
 * @param varName Query string parameter name
 * @returns Parameter value or null if absent
 */
export default function queryString(varName: string): string | null {
  const params = new URLSearchParams(window.location.search);
  // Get the value of "varName" in eg "https://example.com/?some_key=some_value"
  return params.get(varName);
}
