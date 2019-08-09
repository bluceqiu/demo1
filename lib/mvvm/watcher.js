
import Dep from './dep'
import CompileUtil from './compileutil'

// 观察者  订阅者
class Watcher {
    constructor(vm, expr, cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;

        this.oldVal = this.get();
    }

    get(){
        Dep.target = this;
        var oldVal = CompileUtil.getValue(this.expr, this.vm);
        Dep.target = null;
        return oldVal;
    }

    update(){
        var newVal = CompileUtil.getValue(this.expr, this.vm);
        if(newVal !== this.oldVal){
            this.cb(newVal);
        }
    }
}

export default Watcher;