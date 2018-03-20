import maps from '../vxMaps'
const windows = {
  state: {
    //动态头部背景色
    headBgColor:'#fff9ec',
    //主页加载条
    loadBar:{}
  },
  actions: {
    setHeadBgColor({commit},color){
      commit(maps.HEAD_BGCOLOR,color);
    }
  },
  mutations: {
    [maps.HEAD_BGCOLOR](state,res){
      state.headBgColor=res;
    }
  },
  getters: {
    bgColor:state=>{return {'backgroundColor':state.headBgColor}}
  },
};
export default windows;
