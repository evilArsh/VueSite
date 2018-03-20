<!-- 导航侧边栏 -->
<template>
<div class="homeNav">
<img src="../../assets/logo.png" class="navLogo">
<p class="me">Jack</p>
<div class="options">
	<router-link to="/"  class="option fa fa-home f1">主页</router-link> 
	<!-- <router-link to="/sign/signIn"  class="option">登录</router-link>  -->
	<router-link to="/blog" class="option fa fa-pencil f2">博客分类</router-link>
	<a href="javascript:;" class="option fa fa-calendar f3">心情日记</a>
	<router-link to="/campusTime" class="option fa fa-graduation-cap f4">校园时光</router-link>
	<a href="javascript:;" class="option fa fa-comment f5">聊天室</a>
	<a href="javascript:;" class="option fa fa-flask f6">实验室</a>
</div>
<div class="links">
	<i class="link fa fa-info-circle"></i>
	<i class="link fa fa-github"></i>
	<i class="link fa fa-weibo"></i>
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
	},
	computed:{
	}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/style/components/cpNavbar.scss';
</style>