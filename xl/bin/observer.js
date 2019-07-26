// const Watcher = require('./watcher');
// import Watcher from './watcher'
// import Dep from './dep'
// debugger
// const watcher = new Watcher();

export {}
// export function obs(data){
//     if(!data || typeof data !== 'object'){
//         return
//     }

//     Object.keys(data).forEach( key => {
//         defineReactive( data, key, data[key] )
//     } )

//     function defineReactive( obj, key, value ){
//         obs( value );
//         let dep = new Dep();
//         Object.defineProperty ( obj, key, {
//             enumerable: true,
//             configurable: true,
//             get: function(){
//                 console.log( 'get:', value )
//                 dep.depend( watcher )
//                 return value
//             },
//             set: function( newVal ){
//                 if( value === newVal ){
//                     return
//                 }
//                 obs( newVal );
//                 value = newVal;
//                 dep.notify();
//                 console.log( 'set:' + newVal )
//             }
//         } )
//     }
// }

