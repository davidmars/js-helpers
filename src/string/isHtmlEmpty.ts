/**
 * Checks if the htmlString contains some real text content after removing spaces and empty tags.
 * @param htmlString
 */
export default function isHtmlEmpty(htmlString: string) {
  let aux: HTMLDivElement | null = document.createElement('div');
  aux.innerHTML = htmlString; //parses the html
  const trimmedContent = aux.innerText.trim();
  aux = null;
  return trimmedContent === ""
}
