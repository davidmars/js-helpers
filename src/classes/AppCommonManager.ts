import LocalStorageJson from "./LocalStorageJson";
import WinPropsListener from "./WinPropsListener";

export default class AppCommonManager {
  /**
   * Local storage
   */
  public ls:LocalStorageJson;

  /**
   * Gestions de la fenetre navigateur
   */
  public win=new WinPropsListener();

  /**
   * Version de l'application
   */
  public  version: string="?.?.?";
  /**
   * Nom de l'application qui sera utilisé pour le nom du LocalStorage
   */
  public appName: string="";
  /**
   * Un endroit où stocker des informations de débogage
   */
  public debug={
    enabled:false
  }

  /**
   * Vous devez appeler init() après avoir instancié cette classe
   * Pour les arguments, vous pouvez par exemple utiliser <code>import packageJson from "../package.json?inline"</code> pour récupérer les informations du package.json
   * @param appName Nom de l'application qui sera utilisé pour le nom du LocalStorage
   * @param version Version de l'application
   */
  public constructor(appName:string,version:string){
    this.ls=new LocalStorageJson(appName);
    this.version=version;
    this.appName=appName;
  }

  /**
   * Initialise les listeners. Vous DEVEZ appeler cette méthode après avoir instancié cette classe.
   * Ce pattern est notamment utilisé pour conserver la réactivité.
   * - Initialise les listeners de la fenêtre
   */
  public init(){
    this.win.init();
  }

}
