export default [{
    path: '/blogMenu',
    name: '博客',
    component: () =>
      import ('../components/blog/cpBlogMenu'),
    meta: {
      isRoot: false,
      target: 'blogMenu',
      dispatchFunc: [{
        name: 'toggleHead',
        payload: false
      }]
    }
  },
  {
    path: '/blogEdit',
    name: '博客编辑',
    component: () =>import ('../components/blog/cpBlogEdit'),
    meta: {
      isRoot: false,
      target: 'blogEdit',
      dispatchFunc: [{
        name: 'toggleHead',
        payload: false
      }]
    }
  },
   {
    path: '/blogContent/:id',
    name: '博客内容',
    component: () =>import ('../components/blog/cpBlogContent'),
    meta: {
      isRoot: false,
      target: 'blogContent',
      dispatchFunc: [ {
        name: 'toggleHead',
        payload: false
      }]
    }
  }

]
