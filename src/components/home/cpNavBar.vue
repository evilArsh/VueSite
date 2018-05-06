<!-- 导航侧边栏 -->
<template>
  <div class="homeNav">
    <transition name="nav">
      <span class="toggle fa fa-bars" v-show="!isNavShow" @click="showNav"  :style="bgColor"></span></transition>
    <transition name="nav">

    <div class="options" v-show="isNavShow" @click="componentHandle">
      <router-link to="/" class="option">主页</router-link>
      <router-link to="/blogMenu" class="option">博客</router-link>
      <router-link to="/blogEdit" class="option">写博客</router-link>
      <router-link to="/sign/signIn" class="option">登录</router-link>
      <router-link to="/userHome" class="option">个人中心</router-link>
    </div>
  </transition>
  </div>
    </transition>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {},
  mounted() {
  },
  computed:{
    ...mapGetters(['isNavShow','bgColor'])
  },
  methods: {
    ...mapActions(['toggleNav']),
    showNav:function(){
      this.toggleNav(true);
    },
    componentHandle:function(e){}
  },
  watch:{ 
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpNavbar.scss';

</style>
