import Vue from 'vue';
import Vuex from 'vuex';
import vxStyle from './modules/vxStyle';
import vxRouter from './modules/vxRouter';
import vxHomeData from './modules/vxHomeData';
import vxBlogData from './modules/vxBlogData';
import vxSign from './modules/vxSign';
import vxStatusManage from './modules/vxStatusManage';
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        vxStyle,
        vxRouter,
        vxHomeData,
        vxBlogData,
        vxSign,
        vxStatusManage
    }
});