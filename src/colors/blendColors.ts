/**
 * blend two hex colors together by an amount
 * @param hexColorA An hexadecimal color
 * @param hexColorB An hexadecimal color
 * @param amount mix amount form 0 to 1
 * @return {string}
 */
export default function blendColors(hexColorA:string, hexColorB:string, amount:number) {
  const hexSplitA=hexColorA.match(/\w\w/g);
  const hexSplitB=hexColorB.match(/\w\w/g);
  if(hexSplitA && hexSplitB){
    const [rA, gA, bA] = hexSplitA.map((c) => parseInt(c, 16));
    const [rB, gB, bB] = hexSplitB.map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
  }
  return '#000000';

}
