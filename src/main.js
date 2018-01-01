// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router/VRIndex';
import store from './store/VXIndex';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
 ...App
}).$mount('#app')
