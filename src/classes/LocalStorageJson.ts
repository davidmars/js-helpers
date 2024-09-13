import EventEmitter from "eventemitter3";

/**
 * La classe LocalStorageJson permet de stocker des objets dans le local storage sous forme de json
 */
export default class LocalStorageJson {

    /**
     * EventEmitter
     * @event change {string} key - La variable qui a changé (ou a été supprimée ou ajoutée)
     */
    public evt: EventEmitter = new EventEmitter();

    /**
     * Le nom de ce storage
     * @private
     */
    private readonly name: string;
    /**
     * Les données de ce storage
     * @private
     */
    private data: any;

    /**
     * Crée un nouveau LocalStorageJson
     * @param name
     */
    constructor(name:string) {
        this.name = "lsjson-"+name;
        this.parse();

        addEventListener("storage", (event) => {
          if(event.key === this.name){
            let changed= this.compare(event.newValue);
            this.parse();
            changed.forEach((key)=>{
              this.evt.emit("change",key);
            })
          }
        });
    }
    private compare(newValue: string | null) {
      // les variables qui ont changé
      const changedVars: string[]=[];
      if(!newValue){
        return changedVars;
      }
      const newData=JSON.parse(newValue);
      // variables modifiées
      for(const key in newData){
        if(this.data[key]!==newData[key]){
          changedVars.push(key);
        }
      }
      // variables supprimées
      for(const key in this.data){
        if(!newData[key]){
          changedVars.push(key);
        }
      }
      return changedVars;
    }
    private parse(){
      this.data=JSON.parse(localStorage.getItem(this.name) || "{}");
    }

    /**
     * Permet de lister les items
     */
    get keys():string[]{
        return Object.keys(this.data);
    }

    /**
     * Ajoute ou définit un item dans le storage
     * @param key
     * @param value
     */
    setItem(key:string,value:any) {
        this.data[key]=value;
        localStorage.setItem(this.name,JSON.stringify(this.data));
    }

    /**
     * Supprime un item du storage
     * @param key
     */
    removeItem(key:string) {
        delete this.data[key];
        localStorage.setItem(this.name,JSON.stringify(this.data));
    }

    /**
     * Récupère un item du storage
     * @param key
     * @param ifNull
     */
    getItem(key:string,ifNull:any=null):any {
        if(!this.data[key]){
            return ifNull;
        }
        return this.data[key];
    }
}


