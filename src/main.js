// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/vrIndex';
import store from './store/vxIndex';
import Http from './static/util/http';
// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
Vue.config.productionTip = false;
// Vue.use(VueSocketio, socketio(process.env.SOCKET),store);
Vue.prototype.$ajax = new Http(store,process.env.API);
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
