/**
 * Renvoie un array dédoublonné
 * @param arr
 */
export function arrayUnique(arr:[]){
    return arr.filter((value, index, array) => {
        return array.indexOf(value) === index;
    })
}