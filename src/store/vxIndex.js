import Vue from 'vue';
import Vuex from 'vuex';
import vxStyle from './modules/vxStyle';
import vxRouter from './modules/vxRouter';
import vxHomeData from './modules/vxHomeData';
import axios from 'axios';
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        vxStyle,
        vxRouter,
        vxHomeData
    }
});