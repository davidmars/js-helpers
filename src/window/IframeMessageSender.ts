import EventEmitter from "eventemitter3";

export default class IframeMessageSender {

  public evt: EventEmitter = new EventEmitter();

  /**
   * Sélecteur css de l'iframe
   * @private
   */
  private iframeSelector: string;

  constructor(iframeSelector:string){
    this.iframeSelector=iframeSelector;
  }

  protected get domain(){
    let $ifr=this.$iframe;
    if(!$ifr) {
      return "";
    }
    return new URL($ifr.src).origin;
  }
  protected get $iframe():HTMLIFrameElement{
    let $ifr=document.querySelector(this.iframeSelector) as HTMLIFrameElement;
    if(!$ifr) {
      console.warn("No background iframe :(", this.iframeSelector);
    }
    return $ifr as HTMLIFrameElement;
  }

  /**
   * Vérifie si l'iframe existe
   */
  public $iframeExists(){
    return !! document.querySelector(this.iframeSelector);
  }



  public postMessage(data:any){
    if(this.$iframe && this.$iframe.contentWindow){
      //console.log('IframeMessageSender postMessage',this.iframeSelector,this.domain,);
      (this.$iframe.contentWindow as Window).postMessage(
        data,
        this.domain
      );
    }
  }

}
