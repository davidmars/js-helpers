/**
 * Renvoie une copie mélangée du tableau
 * @param {any[]} arr
 * @returns {any[]}
 */
export function arrayShuffle(arr:any[]){
    return arr.sort(function(){return 0.5 - Math.random()})
}