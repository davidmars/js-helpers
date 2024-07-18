/**
 * Convert some String to some-string
 * @param string
 */
export function kebabCase(string:string){
    return string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}