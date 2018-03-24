import maps from '../vxMaps';
const vxStatusManage={
    state:{
        packageReg:/^[0-9]{1,}D$/,
        isTipBarVisible:false,
        tipBarMsg:{success:false,data:'',status:''},
        isUserLogin:false,
        userInfo:{nickName:'',avatar:'../../assets/logo.png'}
    },
    actions:{
        //数据入口方法
        submitDataFromServer({commit,dispatch},res){
            let {success}=res;
            if(success){
                dispatch('successDataHandle',res)
            }else{
                dispatch('errorDataHandle',res)
            }
        },
        //登录
        setLoginData({commit,dispatch},res){
            dispatch('submitDataFromServer',res);
           if(res.success) {
             commit(maps.USER_SETINFOR,res)
           }
        },
        setTipBarMsg({commit},res){
            commit(maps.BAR_MSG,res);
        },
        closeTipBar({commit}){
            commit(maps.BAR_CLOSE);
        },
        successDataHandle({commit,dispatch},res){
            //do something
            dispatch('setTipBarMsg',res);
        },
        errorDataHandle({commit,dispatch},res){
            //do something
            dispatch('setTipBarMsg',res);
        }
    },
    mutations:{
        [maps.BAR_MSG](state,res){
            state.tipBarMsg=Object.assign({},res);
            state.isTipBarVisible=true;
        },
        [maps.BAR_CLOSE](state){
            state.isTipBarVisible=false;
        },
        [maps.USER_SETINFOR](state,res){
            state.userInfo.nickName=res.package.userNickName;
            state.userInfo.avatar=res.package.userAvatar;
            state.isUserLogin=true;
        }
    },
    getters:{
        tipBarMsg:state=>state.tipBarMsg,
        tipBarVisible:state=>state.isTipBarVisible,
        isUserLogin:state=>state.isUserLogin,
        userInfo:state=>state.userInfo
    }
};
export default vxStatusManage;