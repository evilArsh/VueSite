import maps from '../vxMaps'
//CPHeader.vue导航系统
//parent为navbar,child为每个navbar的子路由
//1.假如一个路由退出栈了，那么它的子路由的状态是怎样的？
class Parent {
  constructor() {
    this.length = 0;
    this.stack = [];
  }
  push(child) {
    this.stack.push(child);
    this.length++;
  }
  pop(index) {
    //如果不断的进栈然后出栈，数组会变大，考虑一个阈值，满足条件就清空一部分？
    this.length = index; //
    this.stack.splice(index);
  }
  clear() {
    //？splice
    //清空数组的效率问题
    if (this.length !== 0) {
      this.stack = [];
      this.length = 0;
    }
  }
  isEmpty() {
    return this.length ? false : true;
  }
  getSize() {
    return this.length;
  }
}
const vxRouter = {
  state: {
    data: new Parent()
  },
  actions: {
    setPath({ commit }, res) {
      commit(maps.SET_PATH, res);
    },
    delPath({ commit }, index) {
      commit(maps.DEL_PATH, index);
    },
    clearPath({ commit }) {
      commit(maps.CLEAR_PATH);
    },
    //对path操作,core
    alterPath({ commit, state, dispatch }, res) {
      let { fullPath, name, meta } = res;
      let isForward = true;
      for (let tmp of state.data.stack) {
        if (tmp.fullPath === res.fullPath) {
          isForward = false;
        }
      }
      //前进
      if (isForward) {
        //栈非空
        if (!(state.data.isEmpty())) {
          //是父路由进栈
          if (meta.isRoot) {
            state.data.clear();
            dispatch('setPath', { fullPath, name });
          }
          //子路由进栈
          else {
            dispatch('setPath', { fullPath, name });
          }
        }
        //栈空
        else {
          dispatch('setPath', { fullPath, name });
        }
      }
    }

  },
  mutations: {
    [maps.SET_PATH](state, res) {
      state.data.push(res);
    },
    [maps.DEL_PATH](state, index) {
      state.data.pop(index);
    },
    [maps.CLEAR_PATH](state) {
      state.data.clear();
    }
  },
  getters: {
    routerStack: state => state.data,
    getStackLength: state => state.data.length,
    getPath: (state) => state.data.stack[state.data.length - 1]
  }
};
export default vxRouter;
