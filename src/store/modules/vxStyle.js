import maps from '../vxMaps'
const windows = {
  state: {
    //动态头部背景色
    headBgColor:'#fff9ec',
    //主页导航条是否展示
    navShow: false,
    //顶部路由条
    routerShow:true,
    //主页加载条
    loadBar:{}
  },
  actions: {
    setHeadBgColor({commit},color){
      commit(maps.HEAD_BGCOLOR,color);
    },
    toggleNavVisible({ commit }) {
      commit(maps.NAV_SHOW);
    },
    setNavVisible({commit},bool){
      commit(maps.NAV_SHOW,bool);
    },
    toggleRouter({commit}){
      commit(maps.TOGGLE_ROUTER);
    }
  },
  mutations: {
    [maps.HEAD_BGCOLOR](state,res){
      state.headBgColor=res;
    },
    [maps.TOGGLE_ROUTER](state){
      state.routerShow=!state.routerShow;
    },
    [maps.NAV_SHOW](state,bool) {
      if(typeof bool !=='undefined'){
        state.navShow = bool;
      }else{
        state.navShow = !state.navShow;
      }
    }
  },
  getters: {
    navShow: state => state.navShow,
    routerShow:state=>state.routerShow,
    headBgColor:state=>state.headBgColor
  },
};
export default windows;
