
function Element(tagName, props, children){
    if( !( this instanceof Element ) ){
        return new Element(tagName, props, children);
    }

    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : undefined;

    let count = 0;
    children.forEach(child => {
        if(child instanceof Element){
            count += child.count;
        }
        count++;
    });
    this.count = count;
}

function setAttr(el, props, value){
    el.setAttribute(props, value);
}

// 将vdom 渲染成为真是dom
Element.prototype.render = function(){
    const el = document.createElement(this.tagName);

    const props = this.props;
    for (const key in props) {
        setAttr(el, key, props[key]);
    }

    this.children.forEach(child=>{
        const childEl = child instanceof Element ? child.render() : document.createTextNode(child);
        el.appendChild(childEl);
    });
    return el;
}



export default Element;