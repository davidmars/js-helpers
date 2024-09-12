/**
 * Returns querystring value
 * @param varName
 * @return {string}
 */
export default function queryString(varName: string) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  });
// Get the value of "varName" in eg "https://example.com/?some_key=some_value"
  return  params[varName];
}
