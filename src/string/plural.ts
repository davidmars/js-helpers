/**
 * According if count returns the provided ifOne, ifMany or ifZero possibility
 * @param count
 * @param ifOne
 * @param ifMany
 * @param ifZero
 */
export default function plural(
  count:number|Array<any>,
  ifOne:string,
  ifMany:string,
  ifZero:string|null=null){

  if(Array.isArray(count)){
    count=count.length;
  }
  if(!ifZero){
    ifZero=ifMany;
  }

  let txt=""
  switch (count){
    case 0:
      txt= ifZero;
      break;
    case 1:
      txt= ifOne;
      break;
    default:
      txt= ifMany;
      break;
  }
  return txt.replace("[count]",String(count));
}
