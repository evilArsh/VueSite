//对数据的处理
import maps from '../vxMaps';
const vxStatusManage = {
  state: {
    packageReg: /^[0-9]{1,}D$/,
    //一次只有一个提示框，自动关闭
    tipBarMsg: { success: false, data: '', status: '' },
    //手动关闭的提示框
    loadMsg: '',
    //无限多个提示框，自动关闭
    runningMsg: { success: false, data: '', status: '' },
    isUserLogin: false,
    userInfo: { id: '', nickName: '', url: '',originalUrl:'', mail: '',accessToken:''},
    baseResourceURL:'',
    baseURL:''
  },
  actions: {
    //数据入口方法
    //{success:false,data:'',package:''}
    submitDataFromServer({ commit, dispatch }, res) {
      let { success } = res;
      if (success) {
        dispatch('_successDataHandle', res)
      } else {
        dispatch('_errorDataHandle', res)
      }
    },
    //加载数据时的提示框
    toggleLoad({ commit, state }, msg) {
      let _msg=msg;
      if (typeof _msg === 'undefined') {
        /*state.loadMsg.length===0?_msg='加载中...':*/
        _msg='';
      }
      if(_msg===null){
        _msg=' ';
      }
      _msg=_msg.toString();
      commit(maps.LOAD_MSG, _msg)
    },
    /*
        loadMsg({ commit }, res) {
          commit(maps.LOAD_MSG, res);
        },*/
    //消息提示框
    tipMsg({ commit }, res) {
      let _t;
      if(typeof res==='string'){
        _t={
          success:true,
          data:res,
          status:1
        }
      }else{
        _t=res;
      }
      commit(maps.BAR_MSG, _t);
    },
    runMsg({commit},res){
      let _t;
      if(typeof res==='string'){
         _t={
          success:true,
          data:res,
          status:1
        }
      }else{
        _t=res;
      }
      commit(maps.RUN_MSG, _t);
    },
    //登录
    setLoginData({ commit, dispatch }, res) {
      dispatch('submitDataFromServer', res);
      if (res.success) {
        commit(maps.USER_SETINFOR, res)
      }
    },
    //获取用户信息
    setUserInfo({ commit, dispatch }, res) {
      // dispatch('submitDataFromServer', res);
      if (res.success) {
        commit(maps.USER_SETINFOR, res)
      }
    },
    //博客列表
    setBlogList({ commit, dispatch }, res) {
      // dispatch('submitDataFromServer', res);
    },
    //注销登录
    cleanLogin({ commit, state }) {
      state.userInfo = Object.assign({}, { id: '', nickName: '', url: '', mail: '' });
      state.isUserLogin = false;
    },
    _successDataHandle({ commit, dispatch }, res) {
      //do something
      dispatch('tipMsg', res);
    },
    _errorDataHandle({ commit, dispatch }, res) {
      //do something
      dispatch('tipMsg', res);
    },
    setBaseURL({ state }, url) {
      state.baseUrl = url;
    },
    setBaseResourceURL({ state }, url) {
      state.baseResourceURL = url;
    },
    ////////////
    setNickName({ state }, val) {
      state.userInfo.nickName = val;
    },
    setAvatarURL({ state }, val) {
      val=val.replace('\\','/');
      state.userInfo.originalUrl=val;
      state.userInfo.url =state.baseResourceURL+ val;
    },
    setAccessToken({commit},res){
      commit(maps.SET_TOKEN,res);
    }
  },
  mutations: {
    [maps.SET_TOKEN](state, res) {
      window.localStorage.setItem("accessToken",res)
    },
    [maps.LOAD_MSG](state, res) {
      state.loadMsg = res;
    },
    //设置提示信息
    [maps.BAR_MSG](state, res) {
      state.tipBarMsg = Object.assign({}, res);
    }, 
    [maps.RUN_MSG](state, res) {
      state.runningMsg = Object.assign({}, res);
    },
    [maps.USER_SETINFOR](state, res) {
      state.userInfo = Object.assign({}, {
        nickName: res.package.userNickName,
        mail: res.package.userMail,
        id: res.package.userID,
        url: res.package.url,
        accessToken:res.accessToken,
        originalUrl:res.package.url===null?'':res.package.url.substr(res.package.url.lastIndexOf('/'))
      });
      state.isUserLogin = true;
    }
  },
  getters: {
    tipBarMsg: state => state.tipBarMsg,
    isUserLogin: state => state.isUserLogin,
    userInfo: state => state.userInfo,
    getUserID: state => state.userInfo.id,
    getAccessToken:state=>state.userInfo.accessToken||window.localStorage.getItem("accessToken")
  }
};
export default vxStatusManage;
