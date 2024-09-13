//import './demo.scss'
import packageJson from "../package.json?inline"
import humanFileSize from "./files/humanFileSize";
import queryString from "./browser/queryString";
import AppCommonManager from "./classes/AppCommonManager";

console.log("Hello world"   );
console.log("--------------------")
console.log("humanFileSize(1000) = ", humanFileSize(1000)   );
console.log("humanFileSize(1000, 'fr') = ", humanFileSize(1000, 'fr')   );
console.log("humanFileSize(1000000000) = ", humanFileSize(1000000000)   );
console.log("humanFileSize(1000000000000) = ", humanFileSize(1000000000000)   );
console.log("--------------------")
console.log("Essayez de recharger la page avec ?hello=world dans l'url"   );
console.log(`queryString("hello") = `, queryString("hello")   );

console.log("--------------------")
let manager=new AppCommonManager((packageJson as any).name, (packageJson as any).version);
manager.init();
console.log(`let manager=new AppCommonManager((packageJson as any).name, (packageJson as any).version);`);
console.log(`manager.init();`);
console.log("manager.appName = ", manager.appName  );
console.log("manager.version = ", manager.version  );
console.log("manager.win.height = ", manager.win.height  );
console.log("manager.win.width = ", manager.win.width  );
console.log("manager.win.scroll = ", manager.win.scroll  );

manager.ls.setItem("test","test"+Math.random());
console.log("manager.ls.setItem('test','test'+Math.random())");
manager.ls.evt.on('change',(key)=>{
  console.log("manager.ls.evt.on('change',(key)=>{}",key,manager.ls.getItem(key));
})
console.log("manager.ls.getItem('test') = ", manager.ls.getItem('test')  );
console.log("manager.ls.getItem('test2') = ", manager.ls.getItem('test2')  );
console.log("manager.ls.getItem('test2','valeur par défaut') = ", manager.ls.getItem('test2','valeur par défaut')  );
