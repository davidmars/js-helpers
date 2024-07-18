/**
 * Un lerp :)
 * @param {number} previous
 * @param {number} target
 * @param {number} factor
 * @return {number}
 */
export function lerp(previous:number, target:number, factor:number){
    return (1 - factor) * previous + factor * target;
}