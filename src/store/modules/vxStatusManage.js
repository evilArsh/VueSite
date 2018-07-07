//对数据的处理
import maps from '../vxMaps';
const vxStatusManage = {
  state: {
    packageReg: /^[0-9]{1,}D$/,
    //一次只有一个提示框，自动关闭
    tipBarMsg: { success: false, data: '', status: '' },
    //手动关闭的提示框
    loadMsg:'数据加载中',
    //无限多个提示框，自动关闭
    runningMsg:{ success: false, data: '', status: '' },
    isUserLogin: false,
    //base url
    baseUrl: '',
    baseResourceURL: '',
    userInfo: { id: '', nickName: '', avatar: '', mail: '' }
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
    //设置加载组件的文字描述
    setLoadMsg({ commit }, res){
      commit(maps.LOAD_MSG,res);
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
    cleanLogin({commit,state}){
      state.userInfo=Object.assign({},{ id: '', nickName: '', avatar: '', mail: ''});
      state.isUserLogin=false;
    },
    //消息提示框
    setTipBarMsg({ commit }, res) {
      commit(maps.BAR_MSG, res);
    },
    _successDataHandle({ commit, dispatch }, res) {
      //do something
      dispatch('setTipBarMsg', res);
    },
    _errorDataHandle({ commit, dispatch }, res) {
      //do something
      dispatch('setTipBarMsg', res);
    },
    setBaseURL({ state }, url) {
      state.baseUrl = url;
    },
    setBaseResourceURL({ state }, url) {
      state.baseResourceURL = url;
    },
////////////
    setNickName({ state }, val) {
        state.userInfo.nickName=val;
    },
    setAvatarURL({ state }, val) {
           state.userInfo.avatar=val;
    }
  },
  mutations: {
    [maps.LOAD_MSG](state,res){
      state.loadMsg=res;
    },
    //设置提示信息
    [maps.BAR_MSG](state, res) {
      state.tipBarMsg = Object.assign({}, res);
    },
    [maps.USER_SETINFOR](state, res) {
      state.userInfo = Object.assign({}, {
        nickName: res.package.userNickName,
        mail: res.package.userMail,
        id: res.package.userID,
        avatar: res.package.userAvatar
      })
      // state.userInfo.nickName = res.package.userNickName;
      // state.userInfo.mail = res.package.userMail;
      // state.userInfo.avatar = state.setBaseResourceURL + '/' + res.package.userAvatar;
      state.isUserLogin = true;
    }
  },
  getters: {
    tipBarMsg: state => state.tipBarMsg,
    isUserLogin: state => state.isUserLogin,
    userInfo: state => state.userInfo,
    getUserID: state => state.userInfo.id,
    baseResourceURL:state=>state.baseResourceURL
  }
};
export default vxStatusManage;
