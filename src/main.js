// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/vrIndex';
import store from './store/vxIndex';
import Http from './static/util/http';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
Vue.config.productionTip = false;
 // Vue.prototype.$ajax =new Http(store);
Vue.prototype.$ajax =new Http(store,'https://vivcode.cn/api');
new Vue({
  el: '#app',
  router,
  store,
 ...App
})
