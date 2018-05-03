<!-- 导航侧边栏 -->
<template>
  <div class="homeNav">
    <div class="options">
      <router-link to="/" class="option">主页</router-link>
      <router-link to="/blogMenu" class="option">博客</router-link>
      <router-link to="/sign/signIn" class="option">写博客</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {},
  mounted() {},
  methods: {},
  watch:{ 
  },
  computed: {
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpNavbar.scss';

</style>
