import Vue from 'vue'
import Router from 'vue-router'
import signUp from '../pages/sign/pgSignUp.vue'
import signIn from '../pages/sign/pgSignIn.vue'
import home from '../pages/pgHome.vue'
import campusTime from '../pages/campusTime/pgCampusTime.vue' // 校园时光
import campusTimeHome from '../pages/campusTime/cpCampusHome.vue' // 校园时光-主页 
import campusTimeAlbum from '../pages/campusTime/cpAlbum.vue' // 校园时光-相册 
import campusTimeLive from '../pages/campusTime/cpLive.vue' // 校园时光-动态 
import campusTimeMessage from '../pages/campusTime/cpMessage.vue' // 校园时光-留言 
 
Vue.use(Router)

export default new Router({
    routes: [{ 
        path: '/',
        name: '首页',
        component: home,
        meta:{
            isRoot:true
        }
    }, 
    //博客分类,默认为最新的博客
    /*{
        path:'/Blog',
        name:'博客分类',
        component:Blog,
        meta:{
            isRoot:true
        }
    },*/
    //用户登录注册
    {
        path: '/sign/signUp',
        name: '注册',
        component: signUp,
        meta:{
            isRoot:true
        }
    }, 
    {
        path: '/sign/signIn',
        name: '登录',
        component: signIn,
        meta:{
            isRoot:true
        }
    },
    {
        path:'*',
        redirect:'/',
        meta:{
            isRoot:true
        }
    },
    {
        path: '/campusTime',
        name: '校园时光',
        component: campusTime,
        meta: {
            isRoot: true
        },
        children: [
            {
                path: '/campusTime/',
                name: '校园时光-主页',
                component: campusTimeHome,
                meta:{
                    isRoot: false
                }
            },
            {
                path: '/campusTime/home',
                name: '校园时光-主页',
                component: campusTimeHome,
                meta:{
                    isRoot: false
                }
            },
            {
                path: 'album',
                name: '校园时光-相册',
                component: campusTimeAlbum,
                meta:{
                    isRoot: false
                }
            },
            {
                path: 'message',
                name: '校园时光-留言',
                component: campusTimeMessage,
                meta:{
                    isRoot: false
                }
            },
            {
                path: 'live',
                name: '校园时光-动态',
                component: campusTimeLive,
                meta:{
                    isRoot: false
                }
            }
        ]
    }
    ]
});
