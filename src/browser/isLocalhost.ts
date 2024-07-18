/**
 * Renvoie true si on est sur localhost
 * @param {string} host
 */
export default function isLocalhost(host:string=document.location.host){
    switch (true){
        case host.indexOf('localhost')===0:
        case host.indexOf('127.0.0.')===0:
            return true;
    }
    return false;
}