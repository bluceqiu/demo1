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
        let dep = new Dep();
        Object.defineProperty(data, name, {
            get(){
                Dep.target &&  dep.addSub(Dep.target);
                return value;
            },
            set:(newVal)=>{
                if(newVal != value){
                    this.Observe(newVal);
                    value = newVal;
                    dep.notify();
                }
            }
        });
    }
}

export default Observer;