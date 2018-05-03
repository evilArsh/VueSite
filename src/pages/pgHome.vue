<!-- 主页 -->
<template>
  <div class="homeContainer" :style="bgColor">
    <v-cprouter></v-cprouter>

    <v-pgnavbar></v-pgnavbar>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="footer">
      <a href="javascript:;" class="about">about</a>
      <p class="footerWord">Copyright © 2018 <a class="linkWord" href="http://www.miitbeian.gov.cn">黔ICP备17004129号</a></p>
    </div>
  </div>
</template>
<script>
import pgNavBar from '@/components/home/cpNavBar'
import cpRouter from '@/components/home/cpRouter'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
    'v-pgnavbar': pgNavBar,
    'v-cprouter': cpRouter,

  },
  computed: {
    ...mapGetters(['bgColor'])
  },
  methods: {},
  watch: {},
  beforeMount() {

  },
  mounted() {},
  beforeUpdate() {}
}

</script>
<style src="../static/style/animate.css"></style>
<style lang="scss" scoped>
@import "../static/style/pages/pgHome.scss";

</style>
