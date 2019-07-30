import Dep from "../observer/dep";

export class Observer{
    constructor(){

    }

    walk(){
        defineReactive();
    }

    observeArray(){
        observe();
    }
}




export function defineReactive(){
    const dep = new Dep();

    Object.defineProperty ( obj, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            console.log( 'get:', value )
            dep.depend( watcher )
            return value
        },
        set: function( newVal ){
            if( value === newVal ){
                return
            }
            observer( newVal );
            value = newVal;
            dep.notify();
            console.log( 'set:' + newVal )
        }
    } )
}