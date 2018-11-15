import maps from '../vxMaps'
//CPHeader.vue导航系统
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
    this.length = index;
    this.stack.splice(index);
  }
  clear() {
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
      if (meta.hasOwnProperty('isRoot')&&meta.isRoot) {
        state.data.clear();
        dispatch('setPath', { fullPath, name });
      } else {
        let index = state.data.stack.length;
        for (let  i= state.data.stack.length-1;i>=0; i--) {
          if (state.data.stack[i].fullPath === res.fullPath) {
            index = i ;
            break;
          }
        }
         commit(maps.DEL_PATH,index);
         dispatch('setPath', { fullPath, name });
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
