export default[
    {
        path:'/blogMenu',
        name:'博客',
        component:()=>import('../components/blog/cpBlogMenu'),
        meta:{
            isRoot:true,
            target:'blogMenu'
        }
    }]