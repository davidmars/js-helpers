/**
 * Generate a random string
 * @param strLen How many characters to generate
 * @param characters possible characters
 */
export default function randString(strLen=20,characters="abcdefghijklmnopqrstuvwxyz1234567890"){
  let result = '';
  while (result.length < strLen) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
