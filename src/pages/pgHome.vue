<!-- 主页 -->
<template>
  <div id="home" class="homeContainer" :style="bgColor" :class="{fixed:isHomeFixed}">
    <v-cpheader></v-cpheader>
    <v-cprouter></v-cprouter>
    <v-cptipbar></v-cptipbar>

    <transition name="fade" mode="out-in">
      <keep-alive :include="['blogMenu']">
      <router-view></router-view>
        
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import cpRouter from '@/components/home/cpRouter'
import cpHeader from '@/components/home/cpHeader'
import cpTipBar from '@/components/common/cpTipBar'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      // //如果滚轮上滑，不触发
      // old: 0,
      // news: 1,
    }
  },
  components: {
    'v-cptipbar':cpTipBar,
    'v-cprouter': cpRouter,
    'v-cpheader': cpHeader,
  },
  computed: {
    ...mapGetters(['bgColor','isHomeFixed'])
  },
  methods: {
    ...mapActions(['setGetBlogSignal','toggleWait']),

    scroll: function(e) {
    },
    beforeEnter: function(el) {
      el.classList.remove("normal");
      el.classList.add("toggle");
    },
    enter: function(el, done) {
      el.classList.remove("toggle");
      el.classList.add("normal");

    },
    leave: function(el, done) {
      el.classList.remove("normal");
      el.classList.add("toggle");

    },
  },
  watch: {
  },
  beforeMount() {
  },
  mounted() {
    this.toggleWait(false)
  },
  beforeMount() {
    this.toggleWait(true)
  }
}

</script>
<style lang="scss" scoped>
@import "../static/style/pages/pgHome.scss";

</style>
