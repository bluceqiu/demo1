// import Xl from '../lib/mvvm/MVVM'

// new Xl({
//     el: "#app",
//     data:{
//         frame: {
//           name: 'xl',
//           age: 18
//         },
//         ruok: 'yes',
//         message: '<h5>马杀鸡</h5>'
//     },
//     computed: {
//       getType(){
//         return this.frame.age + " is a superman"
//       }
//     },
//     methods: {
//       refresh(e){
//         this.frame.age++;
//       }
//     },
//   });

import Vue from 'vue';
import app from './App';

Vue.prototype.$dispatch = function(eventName, value){
  let parent = this.$parent; // this 此时为调用者
  while(parent){
    parent.$emit(eventName, value);
    parent = parent.$parent;
  }
}
Vue.prototype.$broadcast = function(eventName, value){
    let children = this.$children;
    
    const broadcast = (children) => {
        children.forEach(c => {
          c && c.say && console.log(c);
          c.$emit(eventName, value);
          if(c.$children){
            broadcast(c.$children);
          }
        });
    }

   broadcast(children);
  
}
Vue.prototype.$bus = new Vue();
new Vue({
  el: '#app',
  render: h=>h(app) // 为什么写成大括号的形式就渲染不粗来
})

