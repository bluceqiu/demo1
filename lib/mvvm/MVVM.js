
import Observer from './observer'
import Compiler from './compiler'

class Xl{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;
        this.$computed = options.computed;
        this.$methods = options.methods;

        if(this.$el){
            new Observer(this.$data);
            window.vm = this;

            if(this.$computed){
                for (let key in this.$computed) {
                    Object.defineProperty(this.$data, key, {
                        get: ()=>{
                            return this.$computed[key].call(this);
                        }
                    });
                }
            }

            if(this.$methods){
                for (let key in this.$methods) {
                    Object.defineProperty(this, key, {
                        get: ()=>{
                            return this.$methods[key];  //这里应该是返回一个方法， 不能call(this)
                        }
                    });
                }
            }

            this.proxyVm(this.$data);
            new Compiler(this.$el, this);
        }
    }

    proxyVm(data){
        for (let key in data) {
            Object.defineProperty(this, key, {
                get(){
                    return data[key]
                },
                set(newVal){
                    data[key] = newVal;
                }
            });
        }
    }

   
}


export default Xl;