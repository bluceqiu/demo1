

export default class Dep {
    constructor(){
        this.subs = []
    }

    depend(){
        if( Dep.target ){
            Dep.target.addDep( this )
        }
    }

    addSub( sub ){
        this.subs.push( sub );
    }

    removeSub(){
        // this.subs.pop( );
    }

    notify(){
        this.subs.forEach(( w ) => {
            w.update();
        })
    }


}

