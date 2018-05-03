import maps from '../vxMaps'
const vxBlogData = {
  state: {
    listLock: true,
    storage: []
  },
  actions: {
    //取数据
    fetchListData({ commit, disPatch, state }) {

    }
  },
  mutations: {
 
  },
  getters: {
    getBlogList: state => {
      return state.listLock ? [] : state.storage;
    }
  }
};
export default vxBlogData;
