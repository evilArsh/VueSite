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
    ...mapActions(['setGetBlogSignal']),

    scroll: function(e) {
      // if (this.old < this.news) {
      //   this.old = this.news;
      //   this.news = e.target.scrollTop;

      //   if (e.target.scrollTop >= (e.target.scrollHeight * 0.3)) {
      //     this.setGetBlogSignal(true);
      //   }
      // }
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
  mounted() {},
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import "../static/style/pages/pgHome.scss";

</style>
