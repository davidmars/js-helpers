/**
 * Trim the email string to something like this: juli...@domain.com."
 * @param email The email tu trim (if necessary)
 * @param maxLength How many characters max ?
 */
export default function trimEmail(email: string, maxLength: number = 14) {
    if (email.length <= maxLength) {
        return email;
    }
    let sp = email.split("@");
    let dif = email.length - maxLength;
    let cut = sp[0].length - dif;
    cut = Math.max(4, cut);
    sp[0] = sp[0].substring(0, cut) + "..."
    maxLength += 3;
    let r = `${sp[0]}@${sp[1]}`

    if (r.length > maxLength + 1) {
        dif = r.length - maxLength;
        cut = sp[1].length - dif;
        cut = Math.max(4, cut);
        sp[1] = sp[1].substring(0, cut) + "..."
        maxLength += 3;
        r = `${sp[0]}@${sp[1]}`
    }
    //si 4 points ou plus, remplace par 3 points
    r = r.replace(/(\.){3,}/g, "...");
    return r;
}