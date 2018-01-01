import Vue from 'vue';
import Vuex from 'vuex';
import VXStyle from './modules/vxStyle';
import VXRouter from './modules/vxRouter';
import axios from 'axios';
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		VXStyle,
		VXRouter,
	}
});