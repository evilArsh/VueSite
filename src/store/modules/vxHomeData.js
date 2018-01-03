import maps from '../vxMaps'
//模拟
import xData from '../../../static/data/blogData.json'
const vxHomeData={
    state:{
        //数据
        storage:[],
        //是否拿到了所有数据
        isAll:false,
        //每次获取数据的个数
        dataAmount:10
    },
    actions:{
        fetchData({commit,state,dispath}){
            //模拟
            setTimeout(function(){
                for(let i=0;i<xData.data.length;i++){
                state.storage.push(xData.data[i])    
            }},3000);

            //state.storage=Object.assign([],state.storage,xData.data);
        },
        //状态管理
        statusManage({commit}){}
    },
    mutations:{

    },
    getters:{
        getData:state=>state.storage,
        isAll:state=>state.isAll
    }
};
export default vxHomeData;