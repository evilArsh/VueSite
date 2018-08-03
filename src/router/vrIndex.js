import Vue from 'vue'
import store from '../store/vxIndex'
import Router from 'vue-router'
import sign from './vrSign'
import blog from './vrBlog'
import color from './vrRouterBindColor'
Vue.use(Router)
const router = new Router({
  routes: [{
      path: '/',
      name: '首页',
      component: () =>
        import ('../pages/pgIndex'),
      meta: {
        isRoot: true,
        target: 'home',
        dispatchFunc: [{
          name: 'toggleHead',
          payload: true
        }]
      }
    },
    {
      path: '/userHome',
      component: () =>
        import ('../pages/pgUserHome'),
      name: '个人中心',
      meta: {
        isRoot: false,
        target: 'userHome',
        dispatchFunc: [{
          name: 'toggleHead',
          payload: false
        }]
      }
    },
    ...sign,
    ...blog,
    {
      path: '*',
      redirect: '/',
      name: '首页',
      component: () =>
        import ('../pages/pgIndex'),
      meta: {
        isRoot: true,
        target: 'home',
        dispatchFunc: [{
          name: 'toggleHead',
          payload: true
        }]
      }
    }
  ]
});
router.beforeEach(function(to, from, next) {
store.dispatch('toggleLoad','模块加载中');
  next();
});
router.afterEach(function(to, from) {
store.dispatch('toggleLoad');
  if (typeof to.meta.isRoot !== 'undefined') {
    store.dispatch('setHeadBgColor', color[to.meta.target])
  }
  if (typeof to.meta.dispatchFunc === 'object' && typeof to.meta.dispatchFunc.length === 'number') {
    for (var i = 0; i < to.meta.dispatchFunc.length; i++) {
      store.dispatch(to.meta.dispatchFunc[i].name, to.meta.dispatchFunc[i].payload);
    }
  }
  // store.dispatch('toggleHead',false)
});

export default router
