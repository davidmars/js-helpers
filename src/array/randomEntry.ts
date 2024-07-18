/**
 * Returns a random entry from the items array
 * @param items The source array
 */
export function randomEntry(items:[]){
    return items[Math.floor(Math.random()*items.length)];
}