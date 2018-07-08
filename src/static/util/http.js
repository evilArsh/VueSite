import axios from "axios";
export default class Http {
  constructor(store, url) {
    if (typeof url === 'undefined') {
      this.baseURL = 'http://localhost:7001/api';
    } else {
      this.baseURL = url;
    }
    this.baseResourceURL = this.baseURL + '/resources';
    this.store = store;
    this._axios = this.createHttp();
  }
  createHttp() {
    let __a = axios.create({
      baseURL: this.baseURL,
      timeout: 30000
    });
    __a.interceptors.request.use(this.req.bind(this), this.reqErr.bind(this));
    __a.interceptors.response.use(this.res.bind(this), this.resErr.bind(this));
    return __a;
  }
  resolveUrl(data) {
    if (data.hasOwnProperty('url')) {
      if (data.url) {
        data.url = this.baseResourceURL + data.url.replace('\\', '/');
      }
    }
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object' && data[key] !== null) {
        this.resolveUrl(data[key]);
      }
    });
  }
  // 添加请求拦截器
  req(conf) {
    return conf;
  }
  //请求错误拦截
  reqErr(err) {
    this.store.dispatch('toggleLoad');
    this.store.dispatch('tipMsg', { success: false, data: err.toString() });
    return Promise.reject(err);
  }
  // 添加响应拦截器
  res(res) {
    this.store.dispatch('toggleLoad');
    if (res.data.hasOwnProperty('package')) {
      this.resolveUrl(res.data.package);
    }
    // console.log(res)
    return res;
  }
  //回应错误拦截
  resErr(err) {

    this.store.dispatch('toggleLoad');
    this.store.dispatch('tipMsg', { success: false, data: err.toString() });
    return Promise.reject(err);
  }
  getCsrf() {
    let o = document.cookie.match(/(^| )_csrf=([^;]*)(;|$)/);
    return o === null ? null : o[2];
  }
  initial() {
    this.store.dispatch('setBaseURL',this.baseURL);
    this.store.dispatch('setBaseResourceURL',this.baseResourceURL);
       this._axios({
        url: '/token',
        method: 'get',
        withCredentials: true
      }).then(function(response) {}).catch(function(err) {});
    }
    //登录
    login(userKey) {
      return this._axios({
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
    }
    //获取用户
    getUserInfo(userKey) {
      return this._axios({
        url: '/token',
        method: 'get',
        withCredentials: true
      });
    }
    //注册
    register(userKey) {
      return this._axios({
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
    //所有博客列表
    getBlogList(queryAfter, number) {
      queryAfter = parseInt(queryAfter),
        number = parseInt(number)
      return this._axios({
        url: '/blog',
        method: 'get',
        params: {
          queryAfter: queryAfter,
          number: number
        },
        headers: {},
        withCredentials: true
      });
    }
    //单个用户博客列表
    getUserBlogList(id, queryAfter, number) {
      queryAfter = parseInt(queryAfter),
        number = parseInt(number)
      return this._axios({
        url: '/blog' + '/' + id,
        method: 'get',
        params: {
          queryAfter: queryAfter,
          number: number
        },
        headers: {},
        withCredentials: true
      });
    }
    getBlogContent(id) {
      return this._axios({
        url: '/blogContent' + '/' + id,
        method: 'get',
        headers: {},
        withCredentials: true
      });
    }
    //修改资料
    updateUser(id, data) {
      return this._axios({
        url: '/user' + '/' + id,
        method: 'put',
        data: data,
        headers: {
          "x-csrf-token": this.getCsrf()
        },
        withCredentials: true
      });
    }
    //上传头像
    //用户Id
    upload(id, data) {
      return this._axios({
        url: '/resources/' + id,
        method: 'put',
        data: data,
        headers: {
          "x-csrf-token": this.getCsrf()
        },
        withCredentials: true
      });
    }
    //用户id
    createBlog_WangEditor(id, data) {
      return this._axios({
        url: '/blogContent',
        method: 'post',
        params: {
          id: id
        },
        data: data,
        headers: {
          "x-csrf-token": this.getCsrf()
        },
        withCredentials: true
      });
    }
    //注销
    loginOut(id) {
      return this._axios({
        url: '/user' + '/' + id,
        method: 'delete',
        headers: {
          "x-csrf-token": this.getCsrf()
        },
        withCredentials: true
      });
    }
}
