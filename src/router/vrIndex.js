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
      meta: {
        isRoot: true,
        target: 'home',
        dispatchFunc: [{
          name: 'toggleFoot',
          payload: true
        }, {
          name: 'toggleHead',
          payload: true
        }, {
          name: 'toggleNav',
          payload: true
        }]
      }
    },
    {
      path: '/userHome',
      component: () =>import ('../pages/pgUserHome'),
      name: '个人中心',
      meta: {
        isRoot: true,
        target: 'userHome',
        dispatchFunc: [{
          name: 'toggleFoot',
          payload: false
        }, {
          name: 'toggleHead',
          payload: false
        }, {
          name: 'toggleNav',
          payload: false
        }]
      }
    },
    ...sign,
    ...blog,
    {
      path: '*',
      redirect: '/',
      meta: {
        isRoot: true
      }
    }
  ]
});
router.beforeResolve(function(to, from, next) {
    if (typeof to.meta.dispatchFunc === 'object' && typeof to.meta.dispatchFunc.length === 'number') {
    for (var i = 0; i < to.meta.dispatchFunc.length; i++) {
     store.dispatch(to.meta.dispatchFunc[i].name, to.meta.dispatchFunc[i].payload);
    }
  }
  next();
});
router.afterEach(function(to, from) {
  if (typeof to.meta.isRoot !== 'undefined' && to.meta.isRoot) {
    store.dispatch('setHeadBgColor', color[to.meta.target])
  }

  // store.dispatch('toggleHead',false)
});
export default router
