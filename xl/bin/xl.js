
import observer from "./observer"

export default class XL {
    constructor (options){
        console.log( "ptions:", options );
        
        this._data = options;
        observer(this._data);
    }
}