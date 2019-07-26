// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

import XL from '../xl/bin/xl'
// import * as circle from '../xl/bin/xl';
debugger
new XL();
// console.log( XL(2) );
// console.log('圆面积：' + circle.area(4));
// console.log('圆周长：' + circle.circumference(14));


new XL( {
  a: [ 1, 2 ],
  b: {
      m: 'hello',
      n: true
  }
} )
