import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/pgHome.vue'
import sign from './vrSign'
import campusTime from './vrCampusTime'
import blog from './vrBlog'
Vue.use(Router)
const router= new Router({
    routes: [{ 
        path: '/',
        name: '首页',
        component: home,
        meta:{
            isRoot:true
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
router.beforeEach((to,from,next)=>{
    console.log(to)
    console.log('dasdsadasd')
    next();
});

export default router;