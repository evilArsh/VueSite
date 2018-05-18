import axios from "axios";
var baseURL = 'http://localhost:7001/api';
var baseResourceURL = 'http://localhost:7001/api/resources';
axios.defaults.baseURL = baseURL;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
   // console.log('request',config)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
   // console.log('response',response)
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
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
      store.dispatch('setBaseResourceURL', baseResourceURL);
      axios({
        url: '/token',
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
    },
    //所有博客列表
    getBlogList(queryAfter, number) {
      queryAfter = parseInt(queryAfter),
        number = parseInt(number)
      return axios({
        url: '/blog',
        method: 'get',
        params: {
          queryAfter: queryAfter,
          number: number
        },
        headers: {},
        withCredentials: true
      });
    },
    //单个用户博客列表
    getUserBlogList(id, queryAfter, number) {
      queryAfter = parseInt(queryAfter),
        number = parseInt(number)
      return axios({
        url: '/blog' + '/' + id,
        method: 'get',
        params: {
          queryAfter: queryAfter,
          number: number
        },
        headers: {},
        withCredentials: true
      });
    },
    getBlogContent(id){
            return axios({
        url: '/blogContent' + '/' + id,
        method: 'get',
        headers: {},
        withCredentials: true
      });
    },
    //修改资料
    updateUser(id, data) {
      return axios({
        url: '/user' + '/' + id,
        method: 'put',
        data: data,
        headers: {
          "x-csrf-token": this.getCsrf()
        },
        withCredentials: true
      });
    },
    //上传头像
    //用户Id
    upload(id, data) {
      return axios({
        baseURL: baseResourceURL,
        url: '/'+id,
        method: 'put',
        data: data,
        headers: {
          "x-csrf-token": this.getCsrf()
        },
        withCredentials: true
      });
    },
    //用户id
    createBlog_WangEditor(id,data){
      return axios({
        url: '/blogContent',
        method: 'post',
        params:{
          id:id
        },
        data: data,
        headers: {
          "x-csrf-token": this.getCsrf()
        },
        withCredentials: true
      });
    },
    //注销
    loginOut(id){
        return axios({
            url: '/user'+'/'+id,
            method: 'delete',
            headers: {
                "x-csrf-token":this.getCsrf()
            },
            withCredentials: true
        });
    }
  }
};
