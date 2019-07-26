// import {dep} from './dep'

export default class Watcher {
    constructor () {
        this.deps = [];
    }

    addDep( d ){
        this.deps.add( d );
    }

    update(  ){
        console.log('update 视图。');
        // this.dep[name].forEach( d => {
        //     d();
        // });
    }
}