/**
 * Clone en profondeur une valeur en ne conservant que les données
 * sérialisables en JSON (objets simples, tableaux, nombres, chaînes, booléens, null).
 *
 * - Crée une nouvelle référence.
 * - Supprime les méthodes, les Dates, les Maps, les Sets, les Symbol, etc.
 *
 * @param {any} value Valeur à cloner
 * @returns {any} Copie "JSON-safe" de la valeur
 */
export default function toPlainJson(value: any): any {
  return JSON.parse(JSON.stringify(value));
}
