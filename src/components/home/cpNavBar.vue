<!-- 导航侧边栏 -->
<template>
  <div class="homeNav">
    <div ref="black"  class="" @click="hideNav"></div>
      <span class="toggle fa fa-bars"  @click="showNav"  :style="bgColor"></span>
    <div ref="bar" class="options hide"  @click="componentHandle">
      <router-link to="/" class="option">主页</router-link>
      <router-link to="/blogMenu" class="option">博客</router-link>
      <router-link to="/blogEdit" class="option">写博客</router-link>
      <router-link to="/sign/signIn" class="option">登录</router-link>
      <router-link to="/userHome" class="option">个人中心</router-link>
    </div>
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
    beforeEnter:function(el){
    console.log(el)
    },
    ...mapActions(['toggleNav']),
    hideNav:function(){
      this.$refs.black.classList.remove('black');
      this.$refs.bar.classList.add('hide')
    },
    showNav:function(){
      this.$refs.bar.classList.remove('hide');
      this.$refs.black.classList.add('black');
      // this.toggleNav(true);
    },
    componentHandle:function(e){
            this.$refs.black.classList.remove('black');
      this.$refs.bar.classList.add('hide')
    }
  },
  watch:{ 
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpNavbar.scss';

</style>
