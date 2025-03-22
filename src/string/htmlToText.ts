/**
 * Convertit un texte HTML en texte brut
 * @param html
 */
export function htmlToText(html: string): string {
    return html
        .replace(/<[^>]*>/g, '') // supprime toutes les balises HTML
        .replace(/\s+/g, ' ')    // remplace les multiples espaces ou retours à la ligne par un espace simple
        .trim();                 // supprime les espaces de début et fin.
}