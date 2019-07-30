


export default class Watcher {
    constructor () {
        this.deps = [];

        this.newDepIds = [];
        this.newDeps = [];
        this.depIds = [];

        this.cb = cb;

        this.getter = expOrFn;

        this.value = this.get();
    }

    addDep( dep ){
        const id = dep.id;
        if( !this.newDepIds.has(id) ){
            this.newDepIds.push(id);
            this.newDeps.push(dep);
            if( !this.depIds.has(id) ){
                dep.addSub(this);
            }
        }
        this.deps.add( dep );
    }

    run(){
        const value = this.get();

        this.cb.call( this.vm, value, oldValue );
    }

    queueWatcher(this){

    }

    update(  ){
        console.log('update 视图。');
    }

    get(){
        pushTarget(this);

        let value = this.getter.call( vm, vm );
    }
}

// 总结：依赖收集最终在 watcher.newDeps 中push了闭包中传过来的dep对象，
// 在dep.subs中push了初始化Vue时建立的Watcher对象，
// 这个对象的，this.getter = expOrFn,传过来的expOrFn是后期数据更新页面渲染的核心步骤