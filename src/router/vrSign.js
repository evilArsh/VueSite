import signUp from '../pages/sign/pgSignUp.vue'
import signIn from '../pages/sign/pgSignIn.vue'
export default [
  //用户登录注册
  {
    path: '/sign/signUp',
    name: '注册',
    component: signUp,
    meta: {
      isRoot: true,
      target:'sign'
    }
  },
  {
    path: '/sign/signIn',
    name: '登录',
    component: signIn,
    meta: {
      isRoot: true,
      target:'sign'
    }
  }
]
