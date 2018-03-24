<!-- 导航侧边栏 -->
<template>
  <div class="homeNav">
    <component :is="currentUserView"></component>
    <div class="options">
      <router-link to="/" class="option fa fa-home f1">主页</router-link>
      <!-- <router-link to="/sign/signIn"  class="option">登录</router-link>  -->
      <router-link to="/blog" class="option fa fa-pencil f2">博客</router-link>
      <a href="javascript:;" class="option fa fa-calendar f3">日记</a>
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
import { mapActions, mapGetters } from 'vuex'
import cpUserHeadDef from '@/components/user/cpUserHeadDef'
import cpUserHead from '@/components/user/cpUserHead'
export default {
  data() {
    return {
      currentUserView: cpUserHeadDef
    }
  },
  components: {},
  mounted() {},
  methods: {},
  watch:{
    isUserLogin:function(val){
        this.currentUserView=val?cpUserHead:cpUserHeadDef;
    }
  },
  computed: {
    ...mapGetters(['isUserLogin'])
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpNavbar.scss';

</style>
