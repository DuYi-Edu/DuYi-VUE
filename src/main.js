import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 模板
// el $mount
// template el.outerHTML 

// 完整版
// 运行时版  （少了编译器，体积小30%，）

new Vue({
  // template: '<p>haah deng is a p</p>',
  render: h => h(App),
}).$mount('#app')
