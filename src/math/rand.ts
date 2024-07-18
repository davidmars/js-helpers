/**
 * Renvoie un nombre aléatoire compris entre min et max
 * @param min La valeur minimal
 * @param max La valeur maximal
 * @param isFloat Passer à true our obtenir des floats
 */
export function rand(min: number, max: number, isFloat: boolean = false): number {
    // Assurez-vous que min et max sont des entiers
    //min = Math.floor(min);
    //max = Math.floor(max);

    if (isFloat) {
        // Génère un nombre à virgule flottante aléatoire entre min et max inclus
        return Math.random() * (max - min) + min;
    } else {
        // Génère un entier aléatoire entre min et max inclus
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}