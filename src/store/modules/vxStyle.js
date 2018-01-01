import maps from '../vxMaps'
const windows = {
  state: {
    //动态头部背景色
    headBgColor:'#fff9ec',
    //主页导航条是否展示
    navShow: false,
    //顶部路由条
    routerShow:true,
    //博客导航条和主页导航条 ，不能共存
    activeCom: 'toggle',
    //博客树形菜单展开与关闭
    //默认展开第一个标题第一个子归档
    //没有的项默认为没有展开
    //优化数据结构(递归)
    activeItem: {
      "0": {
        active: true,
        items: {
          "0": {
            active: true
          }
        }
      }
    },
    //当前(正点击)展开的一项的索引,默认为第一个标题第一个子归档
    currentParent: "0",
    currentChild: "0"

  },
  actions: {
    setHeadBgColor({commit},color){
      commit(maps.HEAD_BGCOLOR,color);
    },
    setNavWidth({ commit }, res) {
      commit(maps.NAV_WIDTH, res);
    },
    setActiveCom({ commit }, res) {
      switch (res) {
        case 'blogBar':
          commit(maps.NAV_SHOW, false);
          break;
        case 'homeBar':
          commit(maps.NAV_SHOW, true);
          break;
        default:
          commit(maps.NAV_SHOW, true);
          break;
      }
      commit(maps.ACTIVE_COM, res);
    },
    toggleNavVisible({ commit }) {
      commit(maps.NAV_SHOW);
    },
    setNavVisible({commit},bool){
      commit(maps.NAV_SHOW,bool);
    },
    setCurrentParent({ commit }, index) {
      commit(maps.ACTIVE_PARENT, index);
    },
    setCurrentChild({ commit }, index) {
      commit(maps.ACTIVE_CHILD, index);
    },
    setParentStatus({ commit }, index) {
      commit(maps.STATUS_PARENT, index);
    },
    setChildStatus({ commit }, index) {
      commit(maps.STATUS_CHILD, index);
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
    [maps.NAV_WIDTH](state, res) {
      state.navWidth = res;
    },
    [maps.NAV_SHOW](state,bool) {
      if(typeof bool !=='undefined'){
        state.navShow = bool;
      }else{
        state.navShow = !state.navShow;
      }
    },
    [maps.ACTIVE_COM](state, name) {
      state.activeCom = name;
    },
    [maps.ACTIVE_PARENT](state, index) {
      state.currentParent = index;
    },
    [maps.ACTIVE_CHILD](state, index) {
      state.currentChild = index;
    },
    [maps.STATUS_PARENT](state, index) {

      if (typeof state.activeItem[index] !== 'undefined') {
        state.activeItem[index].active = !state.activeItem[index].active;
      } else {
        var tmp = {};
        tmp[index] = new Object();
        tmp[index].active = true;
        state.activeItem = Object.assign({}, state.activeItem, tmp);
      }
    },
    [maps.STATUS_CHILD](state, index) {
      if ((typeof state.activeItem[state.currentParent].items!=='undefined')&& (typeof state.activeItem[state.currentParent].items[index] !== 'undefined')) {
        var t = state.activeItem[state.currentParent].items[index].active;
        state.activeItem[state.currentParent].items[index].active = !t;
      } else {
        var tmp = {};
        if(typeof state.activeItem[state.currentParent].items === 'undefined'){
        	tmp["items"]=new Object();
        	tmp["items"][index]=new Object();
        	tmp["items"][index].active=true;
        	state.activeItem[state.currentParent]=Object.assign({},state.activeItem[state.currentParent],tmp);
        }else{
        	tmp[index]=new Object();
        	tmp[index].active=true;
        	state.activeItem[state.currentParent].items=Object.assign({},state.activeItem[state.currentParent].items,tmp);
        }

      }
    }
  },
  getters: {
    navWidth: state => state.navWidth,
    navShow: state => state.navShow,
    activeCom: state => state.activeCom,
    getMSG: state => state.activeItem,
    routerShow:state=>state.routerShow,
    headBgColor:state=>state.headBgColor
  },
};
export default windows;
