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
  _push(obj) {
    if (this.reqs.has(obj.reqUrl)) {
      let { single } = this.reqs.get(obj.reqUrl);
      if (single) {
        return false;
      }
    }

    let _obj = {
      reqUrl: undefined,
      method: 'GET',

      tip: '数据加载中...',
      //是否出现提示框
      showTip: true,
      //在请求未完成之前不能再次发送请求
      single: true,
      active: false
    };
    let merge = Object.assign(_obj, obj);
    this.reqs.set(merge.reqUrl, merge);
    return true;
  }
  _canReq(url, _method) {
    if (this.reqs.has(url)) {
      let { single, active, method } = this.reqs.get(url);
      method = method.toLowerCase();
      _method = _method.toLowerCase();
      if ((method === _method) && single && active) { return false };
    }
    return true;
  }
  _done(url) {
    this.reqs.delete(url);
    if (this.reqs.size === 0) {
      this._load();
    } else {
      for (let d of this.reqs.values()) {
        this._load(d.tip);
        break;
      }
    }
  }
  // 添加请求拦截器
  //通过抛出一个异常来中断一个请求
  _req(conf) {
    let _url = this.baseURL + conf.url;
    if (!this._canReq(_url, conf.method)) {
      throw new Error(this.ignoreStr)
    }
    this.reqs.get(_url).active = true;
    this._load(this.reqs.get(_url).tip);
    return conf;
  }
  //请求错误拦截
  _reqErr(err) {
    this._msg(err, false, this.reqs.get(err.config.url).showTip);
    this._done(err.config.url);
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
      this._msg(err, false, this.reqs.get(err.config.url).showTip);
      this._done(err.config.url);
    }
    return Promise.reject(err);
  }
  /////////////
  _load(msg) {
    if (typeof msg === 'undefined') {
      this.store.dispatch('toggleLoad');
      return;
    }
    this.store.dispatch('toggleLoad', msg.toString());
  }
  _msg(msg, success, show) {
    if (typeof success === 'undefined') { success = true };
    if (typeof show === 'undefined') { show = true };
    if (show) {
      this.store.dispatch('tipMsg', { success: success, data: msg.toString() });
    }
  }
  //////////
  getCsrf() {
    let o = document.cookie.match(/(^| )_csrf=([^;]*)(;|$)/);
    return o === null ? null : o[2];
  }
  _http(config) {
    // tip
    // showTip
    // single
    // active
    config.reqUrl = this.baseURL + config.url;
    this._push({ ...config });
    return this._axios(config);
  }
  initial() {
    this.store.dispatch('setBaseURL', this.baseURL);
    this.store.dispatch('setBaseResourceURL', this.baseResourceURL);
    this._http({
      url: '/',
      method: 'get',
      withCredentials: true,
      showTip: false
    });
  }
  //登录
  login(userKey) {
    return this._http({
      url: '/signIn',
      method: 'post',
      data: {
        userMail: userKey.mail,
        userPassword: userKey.pwd
      },
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true,
      tip: '正在登录'
    });
  }
  //获取用户
  getUserInfo() {
    return this._http({
      url: '/token',
      method: 'get',
      withCredentials: true,
      showTip: false
    });
  }
  //注册
  register(userKey) {
    return this._http({
      url: '/signUp',
      method: 'post',
      data: {
        userMail: userKey.mail,
        userPassword: userKey.pwd
      },
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true,
      tip: '正在注册...'
    });
  }
  //所有博客列表
  getBlogList(queryAfter, number) {
    return this._http({
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
    return this._http({
      url: '/blog' + '/' + id,
      method: 'get',
      params: {
        queryAfter: queryAfter,
        number: number
      },
      headers: {},
      withCredentials: true,
      showTip: false
    });
  }
  getBlogContent(id) {
    return this._http({
      url: '/blogContent' + '/' + id,
      method: 'get',
      headers: {},
      withCredentials: true
    });
  }
  //修改资料
  updateUser(data) {
    return this._http({
      url: '/user',
      method: 'put',
      data: data,
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true,
      tip: '正在修改'
    });
  }
  //上传头像
  upload(data) {
    return this._http({
      url: '/resources',
      method: 'post',
      data: data,
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true,
      tip: '正在上传'
    });
  }
  createBlog_WangEditor(data) {
    return this._http({
      url: '/blogContent',
      method: 'post',
      data: data,
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true,
      tip: '正在发布' 
    });
  }
  //注销
  loginOut() {
    return this._http({
      url: '/user',
      method: 'delete',
      headers: {
        "x-csrf-token": this.getCsrf()
      },
      withCredentials: true,
      showTip: false 
    });
  }
}
