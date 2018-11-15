import maps from '../vxMaps'
const windows = {
  state: {
    //头部隐藏开关
    isHeadShow: true,
    //导航条隐藏开关
    isNavShow: true
  },
  actions: {
    toggleHead({ commit, state }, cmd) {
      if (typeof cmd === 'undefined' || typeof cmd !== 'boolean') {
        cmd = !state.isHeadShow;
      }
      let res = Object.assign({}, { cmd: cmd }, { which: 'head' })
      commit(maps.TOGGLE_COMPONENT, res)
    },
    toggleNav({ commit, state }, cmd) {
      if (typeof cmd === 'undefined' || typeof cmd !== 'boolean') {
        cmd = !state.isNavShow;
      }
      let res = Object.assign({}, { cmd: cmd }, { which: 'nav' })
      commit(maps.TOGGLE_COMPONENT, res)
    }
  },
  mutations: {
    [maps.TOGGLE_COMPONENT](state, res) {
      switch (res.which) {
        case 'head':
          state.isHeadShow = res.cmd;
          break;
        case 'nav':
          state.isNavShow = res.cmd;
          break;
      }
    }
  },
  getters: {
    isHeadShow: state => state.isHeadShow,
    isNavShow: state => state.isNavShow
  },
};
export default windows;
