import Watcher from './watcher'

let CompileUtil = {
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

export default CompileUtil;