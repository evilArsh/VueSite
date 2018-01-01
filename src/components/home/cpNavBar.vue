<!-- 导航侧边栏 -->
<template>
<div class="homeNav">
<img src="../../assets/logo.png" class="navLogo">
<p class="me">Jack</p>
<div class="options" @click="hide">
	<router-link to="/"  class="option">主页</router-link> 
	<router-link to="/Sign/SignIn"  class="option">登录</router-link> 
	<router-link to="/Blog" class="option">博客分类</router-link>
	<a href="javascript:;" class="option">心情日记</a>
	<router-link to="/campusTime" class="option">校园时光</router-link>
	<a href="javascript:;" class="option">聊天室</a>
	<a href="javascript:;" class="option">实验室</a>
</div>
<div class="links">
	<i class="link fa fa-info-circle"></i>
	<i class="link fa fa-github"></i>
	<i class="link fa fa-weibo"></i>
	<i class="link fa fa-envelope"></i>
	<i class="link fa fa-rss"></i>
</div>
<div class="content">
</div>
</div>
</template>
<script>
	import {mapActions,mapGetters} from 'vuex'

	export default{
		data(){
			return{
				 
			}
		},
		mounted(){
		},
		methods:{
			...mapActions(["setNavVisible"]),
			hide(event){
				if(event.target&&event.target.nodeName==="A"){
					this.setNavVisible(false);
				}
			}
		},
		computed:{
			...mapGetters(["navShow"])
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/components/cpNavbar.scss';
</style>