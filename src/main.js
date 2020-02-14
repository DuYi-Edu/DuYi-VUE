import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from './http';
import "./assets/reset.css";

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
