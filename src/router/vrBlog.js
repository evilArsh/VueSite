export default [{
    path: '/blogMenu',
    name: '博客',
    component: () =>
      import ('../components/blog/cpBlogMenu'),
    meta: {
      isRoot: true,
      target: 'blogMenu',
      dispatchFunc: [{
        name: 'toggleFoot',
        payload: false
      }]
    }
  },
  {
    path: '/blogEdit',
    name: '博客编辑',
    component: () =>import ('../components/blog/cpBlogEdit'),
    meta: {
      isRoot: true,
      target: 'blogEdit',
      dispatchFunc: [{
        name: 'toggleFoot',
        payload: false
      }, {
        name: 'toggleHead',
        payload: true
      }, {
        name: 'toggleNav',
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
  }

]
