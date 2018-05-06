export default [
  //用户登录注册
  {
    path: '/sign/signUp',
    name: '注册',
    component: ()=>import( '../pages/sign/pgSignIn.vue'),
    meta: {
      isRoot: true,
      target: 'sign',
      dispatchFunc: [{
        name: 'toggleFoot',
        payload: false
      }, {
        name: 'toggleHead',
        payload:false
      }, {
        name: 'toggleNav',
        payload: false
      }]
    }
  },
  {
    path: '/sign/signIn',
    name: '登录',
    component:  ()=>import( '../pages/sign/pgSignUp.vue'),
    meta: {
      isRoot: true,
      target: 'sign',
      dispatchFunc: [{
        name: 'toggleFoot',
        payload: false
      }, {
        name: 'toggleHead',
        payload:false
      }, {
        name: 'toggleNav',
        payload: false
      }]
    }
  }
]
