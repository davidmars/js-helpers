/**
 * Renvoie le type de base d'un élément mais à la différence de typeof, renvoie 'array' pour un tableau et 'null' pour null
 * @param element {any} - l'élément à tester
 */
export function basicTypeOf(element:any):'array'|'object'|'string'|'number'|'boolean'|'null'|'undefined'|'bigint'|'symbol'|'function' {
  if (Array.isArray(element)) {
    return 'array';
  } else if (element === null) {
    return 'null';
  }
  return typeof element;

}
