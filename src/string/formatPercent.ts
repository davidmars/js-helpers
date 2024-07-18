import floorTo from "../math/floorTo";

/**
 * THE atom way to display percents
 * @param percent
 * @param langCode
 * @return something like 09.5
 */
export default function formatPercent(percent:number,langCode?:string){
  let p=`${(floorTo(percent, 0.1).toFixed(1)).padStart(4,"0")}`
  if(langCode==="fr"){
    p=p.replace(".",',');
  }
  return p;
}
