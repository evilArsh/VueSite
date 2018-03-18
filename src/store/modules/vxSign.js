import maps from '../vxMaps';
const vxSign={
    state:{
        mail_reg: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/,
        pwd_reg:/^([\w!@#$%^&*()_+=]){6,15}$/,
        password:'',
        mail:''
    },
    actions:{
        doLogin({commit},res){
            const{mail,pwd}=res;
            console.log(mail)
        }
    },
    mutations:{},
    getters:{
        mailReg: state => state.mail_reg,
        pwdReg:state=>state.pwd_reg
    }
};
export default vxSign;