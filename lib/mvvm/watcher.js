
import Dep from './dep'
import CompileUtil from './compileutil'

// 观察者  订阅者
class Watcher { // 观察者，每一个实例代表一个变量key
    constructor(vm, expr, cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;

        this.oldVal = this.get();
    }

    get(){ 
        // 模版解析的时候，会依次new watcher，每new一次，就会自动调用此get方法，
        // 调用的时候，给Dep.target赋值，然后调用该值的get方法，
        // 此时，Dep.target为true，所有如果是遇到了相同的数据变量，就不会重复new Dep（），而是调用dep.addSub方法，把同一个变量的watcher集中管理
        Dep.target = this;
        var oldVal = CompileUtil.getValue(this.expr, this.vm); // 获取值的时候会调用该值的get方法  ， expr 现在还不能是可以进行运算的表达式，只能是单个的值，可以运算的表达式要解析成ast
        Dep.target = null; // 释放Dep.target
        return oldVal;
    }

    update(){ // 值更新的时候，触发值的set方法，继而触发dep.notify, 继而触发watcher的update，继而又触发了该值的get，继而得到值更新视图
        var newVal = CompileUtil.getValue(this.expr, this.vm); // 在dep实例notify watcher的时候，就是这个变量有新值的时候，执行回调函数更新视图
        if(newVal !== this.oldVal){
            this.cb(newVal); // 每一个cb 对应于一个视图元素
        }
    }
}

export default Watcher;