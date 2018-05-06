import maps from '../vxMaps'
const windows = {
  state: {
    //动态头部背景色
    headBgColor:'#fff9ec',
    //主页加载条
    loadBar:{},
    //头部隐藏开关
    isHeadShow:true,
    //底角隐藏开关
    isFootShow:true,
    //导航条隐藏开关
    isNavShow:true
  },
  actions: {
    toggleHead({commit,state},cmd){
      if(typeof cmd==='undefined'||typeof cmd!=='boolean'){
        cmd=!state.isHeadShow;
      }
      let res=Object.assign({},{cmd:cmd},{which:'head'})
      commit(maps.TOGGLE_COMPONENT,res)
    },
    toggleFoot({commit,state},cmd){
      if(typeof cmd==='undefined'||typeof cmd!=='boolean'){
        cmd=!state.isFootShow;
      }
      let res=Object.assign({},{cmd:cmd},{which:'foot'})
      commit(maps.TOGGLE_COMPONENT,res)
    },
    toggleNav({commit,state},cmd){
        if(typeof cmd==='undefined'||typeof cmd!=='boolean'){
        cmd=!state.isNavShow;
      }
      let res=Object.assign({},{cmd:cmd},{which:'nav'})
      commit(maps.TOGGLE_COMPONENT,res)
    },
    setHeadBgColor({commit},color){
      commit(maps.HEAD_BGCOLOR,color);
    }
  },
  mutations: {
    [maps.TOGGLE_COMPONENT](state,res){
      switch(res.which){
        case 'head':state.isHeadShow=res.cmd;break;
        case 'foot':state.isFootShow=res.cmd;break;
        case 'nav':state.isNavShow=res.cmd;break;
      }
    },
    [maps.HEAD_BGCOLOR](state,res){
      state.headBgColor=res;
    }
  },
  getters: {
    bgColor:state=>{return {'backgroundColor':state.headBgColor}},
    isHeadShow:state=>state.isHeadShow,
    isFootShow:state=>state.isFootShow,
    isNavShow:state=>state.isNavShow
  },
};
export default windows;
