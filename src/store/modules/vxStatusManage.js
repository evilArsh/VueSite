//对数据的处理
import maps from '../vxMaps';
const vxStatusManage = {
  state: {
    packageReg: /^[0-9]{1,}D$/,
    isTipBarVisible: false,
    tipBarMsg: { success: false, data: '', status: '' },
    isUserLogin: false,
    //base url
    baseUrl: '',
    baseResourceURL: '',
    userInfo: { id: '', nickName: '', avatar: '', mail: '' } //this.$ajax.baseURL+'/user.png'

  },
  actions: {
    //数据入口方法
    submitDataFromServer({ commit, dispatch }, res) {
      let { success } = res;
      if (success) {
        dispatch('successDataHandle', res)
      } else {
        dispatch('errorDataHandle', res)
      }
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
      dispatch('submitDataFromServer', res);
      if (res.success) {
        commit(maps.USER_SETINFOR, res)
      }
    },
    //博客列表
    setBlogList({ commit, dispatch }, res) {
      dispatch('submitDataFromServer', res);
    },
    setTipBarMsg({ commit }, res) {
      commit(maps.BAR_MSG, res);
    },
    closeTipBar({ commit }) {
      commit(maps.BAR_CLOSE);
    },
    successDataHandle({ commit, dispatch }, res) {
      //do something
      dispatch('setTipBarMsg', res);
    },
    errorDataHandle({ commit, dispatch }, res) {
      //do something
      dispatch('setTipBarMsg', res);
    },
    setBaseURL({ state }, url) {
      state.baseUrl = url;
    },
    baseResourceURL({ state }, url) {
      state.baseResourceURL = url;
    },
    //小操作
    setNickName({ state }, val) {
        state.userInfo.nickName=val;
    },
    setAvatarURL({ state }, val) {
           state.userInfo.avatar=state.baseResourceURL + '/' + val;
    }
  },
  mutations: {
    //设置提示信息
    [maps.BAR_MSG](state, res) {
      state.tipBarMsg = Object.assign({}, res);
      state.isTipBarVisible = true;
    },
    [maps.BAR_CLOSE](state) {
      state.isTipBarVisible = false;
    },
    [maps.USER_SETINFOR](state, res) {
      state.userInfo = Object.assign({}, {
        nickName: res.package.userNickName,
        mail: res.package.userMail,
        id: res.package.userID,
        avatar: state.baseResourceURL + '/' + res.package.userAvatar
      })
      // state.userInfo.nickName = res.package.userNickName;
      // state.userInfo.mail = res.package.userMail;
      // state.userInfo.avatar = state.baseResourceURL + '/' + res.package.userAvatar;
      state.isUserLogin = true;
    }
  },
  getters: {
    tipBarMsg: state => state.tipBarMsg,
    tipBarVisible: state => state.isTipBarVisible,
    isUserLogin: state => state.isUserLogin,
    userInfo: state => state.userInfo,
    getUserID: state => state.userInfo.id
  }
};
export default vxStatusManage;
