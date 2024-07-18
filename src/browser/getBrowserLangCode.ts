/**
 * Returns a language iso code
 */
export default function getBrowserLangCode(){
  return navigator.language.split("-")[0];
}
