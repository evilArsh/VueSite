// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router/vrIndex';
import store from './store/vxIndex';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
/* eslint-disable no-new */
/*const root=*/new Vue({
  el: '#app',
  store,
  router,
 ...App
})
