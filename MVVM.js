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

class Compiler{
    constructor(el, vm){
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        let fragment = this.node2fragment(this.el);

        this.compile(fragment);

        this.el.appendChild(fragment);
    }

    compile(node){
        let childNodes = node.childNodes;
        [...childNodes].forEach(child => {
            if(this.isElementNode(child)){
                this.compileElement(child);
                this.compile(child); // 递归
            } else {
                this.compileText(child);
            }
        });
    }
    isDirective(attrName){
        return attrName.startsWith('v-');
    }

    compileElement(node){
        let attrs = node.attributes;
        [...attrs].forEach(attr=>{
            let {name, value:expr} = attr;
            if(this.isDirective(name)){
                let [,directive] = name.split('-');
                let [directiveName, eventName] = directive.split(':');
                CompileUtil[directiveName](node, expr, this.vm, eventName);
            }
        });
    }

    compileText(node){
        let content = node.textContent;
        if(/\{\{(.+?)\}\}/.test(content)){ // ? 为非贪婪模式
            CompileUtil['text'](node, content, this.vm);
        }
    }

    node2fragment(node){
        let fragment = document.createDocumentFragment();

        let firstChild;
        while(firstChild = node.firstChild){
            fragment.appendChild(firstChild);
        }
        return fragment;
    }

    isElementNode(node){
        return node.nodeType === 1;
    }
}

CompileUtil = {
    getValue (expr, vm){
        return expr.split('.').reduce((data, current)=>{
            return data[current];
        }, vm.$data );
    },
    setValue(vm, expr, value){
        expr.split('.').reduce((data, current, index, arr)=>{
            if(index == arr.length-1){
                return data[current] = value;
            }
            return data[current];
        }, vm.$data );
    },
    on(node, expr, vm, eventName){
        node.addEventListener(eventName, (e)=>{
            vm[expr].call(vm, e);
        });
    },
    model (node, expr, vm){
        let fn = this.updater['modelUpdater'];
        new Watcher(vm, expr, (newVal)=>{ // 给输入框添加观察者， 数据更新的时候执行
            fn(node, newVal);
        });
        node.addEventListener('input', (e)=>{
            let value = e.target.value;
            this.setValue(vm, expr, value);
        });
        let value = this.getValue(expr, vm);
        fn(node, value);
    },
    getContentValue(vm, expr){
        return expr.replace(/\{\{(.+?)\}\}/g, (...args)=>{
            return this.getValue(args[1].trim(), vm);
        })
    },
    text(node, expr, vm){
        let fn = this.updater['textUpdater'];
        let content =  expr.replace(/\{\{(.+?)\}\}/g, (...args)=>{
            new Watcher(vm, args[1].trim(), (newVal)=>{ // 给文本添加观察者， 数据更新的时候执行
                fn(node, this.getContentValue(vm, expr));
            });
            return this.getValue(args[1].trim(), vm);
        })
        fn(node, content);
    },
    html(node, expr, vm){
        let fn = this.updater['htmlUpdater'];
        new Watcher(vm, expr, (newVal)=>{ // 给输入框添加观察者， 数据更新的时候执行
            fn(node, newVal);
        });
        let value = this.getValue(expr, vm);
        fn(node, value);
    },
    updater: {
        modelUpdater(node, value){
            node.value = value;
        },
        htmlUpdater(node, value){
            node.innerHTML = value;
        },
        textUpdater(node, value){
            node.textContent = value;
        }
    }
}




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