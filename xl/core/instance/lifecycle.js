import Watcher from '../observer/watcher'

export function beforeMounted(){
    new Watcher();
}

export function updateComponent( vm ){
    vm._update();
}