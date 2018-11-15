export default [
  //用户登录
  {
    path: '/sign/signIn',
    name: '登录',
    component:  ()=>import( '../pages/sign/pgSignIn.vue'),
    meta: {
      isRoot: false,
      target: 'sign',
      dispatchFunc: [{
        name: 'toggleHead',
        payload:false
      }]
    }
  }
]
