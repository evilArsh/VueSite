import axios from "axios";
var baseURL = 'http://localhost:7001/api';
var baseResourceURL = 'http://localhost:7001/api/resources';
axios.defaults.baseURL = baseURL;
export default store => {
  return {
    getCsrf() {
      let o = document.cookie.match(/(^| )_csrf=([^;]*)(;|$)/);
      return o === null ? null : o[2];
    },
    getAccessToken() {
      let o = document.cookie.match(/(^| )accessToken=([^;]*)(;|$)/);
      return o === null ? null : o[2];
    },
    initial() {
      //注入baseURL
      store.dispatch('setBaseURL', baseURL);
      store.dispatch('baseResourceURL', baseResourceURL);
      axios({
        url: '/',
        method: 'get',
        withCredentials: true
      }).then(function(response) {}).catch(function(err) {});
    },
    //登录
    login(userKey) {
      return axios({
        url: '/signIn',
        method: 'post',
        data: {
          userMail: userKey.mail,
          userPassword: userKey.pwd
        },
        headers: {
          "x-csrf-token": this.getCsrf()
        },
        withCredentials: true
      });
    },
    //获取用户
    getUserInfo(userKey) {
      return axios({
        url: '/token',
        method: 'get',
        withCredentials: true
      });
    },
    //注册
    register(userKey) {
      return axios({
        url: '/signUp',
        method: 'post',
        data: {
          userMail: userKey.mail,
          userPassword: userKey.pwd
        },
        headers: {
          "x-csrf-token": this.getCsrf()
        },
        withCredentials: true
      });
    }
  }
};
