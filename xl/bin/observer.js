
import Watcher from './watcher'
import Dep from './dep'
const watcher = new Watcher();

export default function observer(data){
    if(!data || typeof data !== 'object'){
        return
    }

    Object.keys(data).forEach( key => {
        defineReactive( data, key, data[key] )
    } )

    function defineReactive( obj, key, value ){
        observer( value );
        let dep = new Dep();
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
}

