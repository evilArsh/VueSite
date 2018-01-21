import Vue from 'vue'
import store from '../store/vxIndex'
import Router from 'vue-router'
import home from '../pages/pgHome.vue'
import sign from './vrSign'
import campusTime from './vrCampusTime'
import blog from './vrBlog'
import color from './vrRouterBindColor'
Vue.use(Router)
const router= new Router({
    routes: [{ 
        path: '/',
        name: '首页',
        component: home,
        meta:{
            isRoot:true,
            target:'home'
        }
    },
    ...sign,
    ...campusTime,
    ...blog,
    {
        path:'*',
        redirect:'/',
        meta:{
            isRoot:true
        }
    }
    ]
});
router.afterEach(function(to,from){
   if(typeof to.meta.isRoot!=='undefined'&&to.meta.isRoot){
    store.dispatch('setHeadBgColor',color[to.meta.target])
   }
});
export default router