import maps from '../vxMaps'
//模拟
import datas from '../../../static/data/blogMain.json'
const vxBlogData = {
  state: {
    listLock: true,
    storage: []
  },
  actions: {
    //取数据
    fetchListData({ commit, disPatch, state }) {
      state.listLock = true;
      //模拟
      //get data from server
      new Promise(function(resolve, reject) {
        setTimeout(function() {
            state.storage=Object.assign([],datas.data);
            resolve();
        }, 1500);
      }).then(function() {
        //then address them
        commit(maps.LIST_STATUS);
      });
    }
  },
  mutations: {
    //管理列表操作状态
    [maps.LIST_STATUS](state) {
      state.listLock = false;
    }
  },
  getters: {
    getBlogList: state => {
      return state.listLock ? [] : state.storage;
    }
  }
};
export default vxBlogData;
