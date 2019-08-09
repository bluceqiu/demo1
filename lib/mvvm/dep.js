// 被观察者  发布者  （观察者模式包含发布订阅模式）
class Dep{
    constructor(){
        this.subs = [];
    }
    addSub(watcher){
        this.subs.push(watcher);
    }

    notify(){
        this.subs.forEach(w=>{
            w.update();
        });
    }
}

export default Dep;