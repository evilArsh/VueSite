export default [
  //用户登录注册
  {
    path: '/sign/signUp',
    name: '注册',
    component: ()=>import( '../pages/sign/pgSignUp.vue'),
    meta: {
      isRoot: false,
      target: 'sign',
      dispatchFunc: [{
        name: 'toggleHead',
        payload:false
      }]
    }
  },
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
