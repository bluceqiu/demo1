import CompileUtil from './compileutil'

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

export default Compiler;