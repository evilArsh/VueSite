import blog from '../pages/pgBlog.vue'
export default[
    {
        path:'/blog',
        name:'博客',
        component:blog,
        meta:{
            isRoot:true,
            target:'blog'
        }
    }]