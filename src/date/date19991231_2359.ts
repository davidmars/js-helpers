/**
 * Returns a dated formated as 19780209-2359
 * @param d
 */
export default function date19991231_2359(d:Date){
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`
}
