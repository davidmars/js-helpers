/**
 * To open a raw url.
 * Simple window.open alias
 * @param url
 * @param newTab
 */
export default function href(url:string,newTab=true) {
    if(newTab){
        window.open(url, '_blank');
    }
    else {
        window.location.href = url;
    }
}