//import './demo.scss'

import humanFileSize from "./files/humanFileSize";
import queryString from "./browser/queryString";

console.log("Hello world"   );

console.log("humanFileSize(1000) = ", humanFileSize(1000)   );
console.log("humanFileSize(1000, 'fr') = ", humanFileSize(1000, 'fr')   );
console.log("humanFileSize(1000000000) = ", humanFileSize(1000000000)   );
console.log("humanFileSize(1000000000000) = ", humanFileSize(1000000000000)   );

console.log("Essayez de recharger la page avec ?hello=world dans l'url"   );
console.log(`queryString("hello") = `, queryString("hello")   );
