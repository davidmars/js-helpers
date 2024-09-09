/**
 * Une classe qui écoute les propriétés de la fenêtre navigateur
 */
export default class WinPropsListener {
  /**
   * Scroll y / de la fenetre
   */
  public scroll: { x: Number; y: Number }={x:0,y:0};
  /**
   * Est-on connecté à internet ?
   */
  public isOnline: boolean =  navigator.onLine;
  /**
   * Largeur de la fenêtre
   */
  public width: number = 0;
  /**
   * Hauteur de la fenêtre
   */
  public height: number = 0;

  constructor() { }
  /**
   * Returns window infos such as size or scroll position
   * @private
   */
  _geWinInfos() {
    this.scroll.y = window.scrollY;
    this.scroll.x = window.scrollX;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  /**
   * Initialise l'écoute des propriétés de la fenêtre
   * Pour conserver la réactivité il faut appeler cette méthode dans un contexte réactif
   */
  init(){

    this._geWinInfos();
    window.addEventListener("resize", (event) => {
      this._geWinInfos();
    });
    window.addEventListener("scroll", (event) => {
      this._geWinInfos();
    });


    window.addEventListener("offline", (e) => {
      this.isOnline = false;
    });
    window.addEventListener("online", (e) => {
      this.isOnline = true;
    });

    this._geWinInfos()
  }




}
