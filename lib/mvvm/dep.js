// 被观察者  发布者  （观察者模式包含发布订阅模式）
class Dep{ // 是一个容器类
    constructor(){
        this.subs = []; // 里面装的是同一个变量（或者说同一个data数据里面同一个key值）的watcher
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