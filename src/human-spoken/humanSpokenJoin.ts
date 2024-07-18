/**
 * Fait un join mais remplace la dernière virgule par "et" ou "and"
 * @param {string[]} words La liste de mots à joindre
 * @param {string} locale Le code iso de la langue
 */
export function humanSpokenJoin(words: string[], locale: string) {
    let and = "&"
    switch (locale) {
        case 'fr':
            and = "et";
            break;
        case 'en':
            and = "and";
            break;
        case 'es':
            and = "y";
            break;
    }
    return words.join(", ").replace(/,(?=[^,]+$)/, ` ${and} `);
}