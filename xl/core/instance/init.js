// import '../instance/lifecycle'

export default function initMixin(){
    Vue.prototype._init = function(){


        initLifecycle();
        // initEvents();
        initState();
    }
}