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
      console.error("Iframe not found :(", this.iframeSelector);
      return "";
    }
    return new URL($ifr.src).origin;
  }
  protected get $iframe():HTMLIFrameElement{
    let $ifr=document.querySelector(this.iframeSelector) as HTMLIFrameElement;
    if(!$ifr) {
      console.error("Iframe not found :(", this.iframeSelector);
    }
    return $ifr as HTMLIFrameElement;
  }



  public postMessage(data:any){
    console.log('IframeMessageSender postMessage',this.iframeSelector,this.domain,);
    (this.$iframe.contentWindow as Window).postMessage(
      data,
      this.domain
    );
  }

}
