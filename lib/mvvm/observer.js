import Dep from './dep'

class Observer {
    constructor(data){
        this.Observe(data);
    }

    Observe(data){
        if(data && typeof data === 'object'){
            for (const key in data) {
                this.defineReactive(data, key, data[key]);
            }
        }
    }

    defineReactive(data, name, value){
        this.Observe(value);
        let dep = new Dep(); // 每一个dep对应一个类型的watcher的容器
        Object.defineProperty(data, name, { // 每一个name对应了一个对象内的key值, 每个key值都只是绑定到自己的父亲上
            get(){
                // 当模版引擎解析模版视图的时候，会new watcher，
                // 然后调用该watcher的get方法，继而调用watcher对应的表达式中的变量的这个get方法，此时Dep.target为true
                Dep.target &&  dep.addSub(Dep.target); 
                return value;
            },
            set:(newVal)=>{ // 每当值改变的时候，都会调用改值对应的set方法
                if(newVal != value){
                    this.Observe(newVal); // 新赋的值可能也说一个对象，继续把对象里面的key值添加绑定
                    value = newVal;
                    dep.notify(); // notify 的时候，执行该dep内保存的所有watcher的update方法，更新视图
                }
            }
        });
    }
}

export default Observer;

// {
//     a: {
//         a1: 1,
//         a2: 2,
//         b:4
//     },
//     b: 3
// }