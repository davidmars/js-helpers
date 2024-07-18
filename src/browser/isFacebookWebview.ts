/**
 * Detect if the browser is something like Messenger or Facebook app
 */
export default function isFacebookWebview(){
    const ua = navigator.userAgent;
    switch (true) {
        case ua.indexOf("FBAN") > -1:
        case ua.indexOf("FBAV") > -1:
            return true
    }
    return false;
}