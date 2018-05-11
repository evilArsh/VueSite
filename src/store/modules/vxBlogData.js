import maps from '../vxMaps'
const vxBlogData = {
  state: {
    //初始化 
    queryAfter: 0,
    number: 10,
    canGetBlog: false
  },
  actions: {
    //取数据
    fetchBlogList({ commit, disPatch, state }) {

    },
    setGetBlogSignal({ commit }, res) {
      commit('SET_BLOG_SIGNAL', res);
    }
  },
  mutations: {
    [maps.SET_BLOG_SIGNAL](state, res) {
      state.canGetBlog=res;
    }
  },
  getters: {
    //canGetBlog:state=>state.canGetBlog
  }
};
export default vxBlogData;
