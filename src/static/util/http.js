import axios from "axios";
import { format } from "path";
export default class Http {
  constructor(store, url) {
    if (typeof url === 'undefined') {
      this.baseURL = 'http://localhost:7001/api';
    } else {
      this.baseURL = url;
    }
    this.ignoreStr = "normal interrupt";
    this.baseResourceURL = this.baseURL + '/resources';
    this.store = store;
    this.timeOut = 20000;
    this._axios = this._createHttp();
    //请求队列
    this.reqs = new Map();
  }
  _push(obj) {
    if (this.reqs.has(obj.url)) {
      let { single/*, complete */ } = this.reqs.get(obj.url);
      if (single /*&& (!complete)*/) {
        return false;
      }
    }

    let _obj = {
      url: undefined,
      tip: '数据加载中...',
      //是否出现提示框
      showTip: true,
      //在请求未完成之前不能再次发送请求
      single: true,
      active: false
      /*,
      time: new Date().getTime(),
      complete: false*/
    };
    let merge = Object.assign(_obj, obj);
    this.reqs.set(merge.url, merge);
    return true;
  }
  _canReq(url) {
    if (this.reqs.has(url)) {
      let { /*complete,*/ single, active } = this.reqs.get(url);
      if (single && active) { return false };
    }
    return true;
  }
  _done(url) {
    this.reqs.delete(url);
    if (this.reqs.size === 0) {
      this.store.dispatch('toggleLoad');
    } else {
      for (let d of this.reqs.values()) {
        this.store.dispatch('toggleLoad', d.tip);
        break;
      }
    }
  }
  _createHttp() {
    let __a = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeOut
    });
    __a.interceptors.request.use(this._req.bind(this), this._reqErr.bind(this));
    __a.interceptors.response.use(this._res.bind(this), this._resErr.bind(this));
    return __a;
  }
  _resolveUrl(data) {
    if (data.hasOwnProperty('url')) {
      if (data.url) {
        data.url = this.baseResourceURL + data.url.replace('\\', '/');
      }
    }
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object' && data[key] !== null) {
        this._resolveUrl(data[key]);
      }
    });
  }
  // 添加请求拦截器
  //通过抛出一个异常来中断一个请求
  _req(conf) {
    let _url=this.baseURL+conf.url;
    if (!this._canReq(_url)) {
      throw new Error(this.ignoreStr)
    }
    this.reqs.get(_url).active = true;
    this.store.dispatch('toggleLoad', this.reqs.get(_url).tip);
    return conf;
  }
  //请求错误拦截
  _reqErr(err) {
    this._done(err.config.url);
    this.store.dispatch('tipMsg', { success: false, data: '_reqErr' + err.toString() });
    return Promise.reject(err);
  }
  // 添加响应拦截器
  _res(_res) {
    this._done(_res.config.url);
    if (_res.data.hasOwnProperty('package')) {
      this._resolveUrl(_res.data.package);
    }
    return _res;
  }
  //回应错误拦截
  _resErr(err) {
    if (err.hasOwnProperty('config')) {
      this._done(err.config.url);
      this.store.dispatch('tipMsg', { success: false, data: '_resErr' + err.toString() });
    }

    return Promise.reject(err);
  }
  getCsrf() {
    let o = document.cookie.match(/(^| )_csrf=([^;]*)(;|$)/);
    return o === null ? null : o[2];
  }
  initial() {
    this.store.dispatch('setBaseURL', this.baseURL);
    this.store.dispatch('setBaseResourceURL', this.baseResourceURL);
    this._push({ url: this.baseURL+'/token', showTip: false });
    this._axios({
      url: '/token',
      method: 'get',
      withCredentials: true
    });
  }
  //登录
  login(userKey) {
    this._push({ url: this.baseURL+'/signIn', tip: '正在登录...' });
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
  getUserInfo() {
    this._push({ url:this.baseURL+ '/token', showTip: false });
    return this._axios({
      url: '/token',
      method: 'get',
      withCredentials: true
    });
  }
  //注册
  register(userKey) {
    this._push({ url: this.baseURL+'/signUp', tip: '正在注册...' });

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
    queryAfter = parseInt(queryAfter);
    number = parseInt(number);
    this._push({ url: this.baseURL+'/blog' });
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
    queryAfter = parseInt(queryAfter);
    number = parseInt(number);
    this._push({ url: this.baseURL+'/blog' + '/' + id, showTip: false });
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
    this._push({ url: this.baseURL+'/blogContent' + '/' + id });
    return this._axios({
      url: '/blogContent' + '/' + id,
      method: 'get',
      headers: {},
      withCredentials: true
    });
  }
  //修改资料
  updateUser(data) {
    this._push({ url:this.baseURL+ '/blogContent' + '/' + id, tip: '正在修改' });
    return this._axios({
      url: '/user',
      method: 'put',
      data: data,
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true
    });
  }
  //上传头像
  upload(data) {
    this._push({ url: this.baseURL+'/resources', tip: '正在上传' });
    return this._axios({
      url: '/resources',
      method: 'post',
      data: data,
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true
    });
  }
  createBlog_WangEditor(data) {
    this._push({ url: this.baseURL+'/blogContent', tip: '正在上传' });
    return this._axios({
      url: '/blogContent',
      method: 'post',
      data: data,
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true
    });
  }
  //注销
  loginOut() {
    this._push({ url: this.baseURL+'/user', showTip: false });
    return this._axios({
      url: '/user',
      method: 'delete',
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true
    });
  }
}
