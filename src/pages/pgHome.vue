<!-- 主页 -->
<template>
  <div id="home" class="homeContainer" :style="bgColor" :class="{fixed:isHomeFixed}">
    <v-cptipbar></v-cptipbar>
    <v-cpheader></v-cpheader>
    <v-cprouter></v-cprouter>
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
    ...mapActions(['toggleLoad']),
  },
  watch: {
  },
  beforeMount() { 
  },
  mounted() {
    this.toggleLoad()
  },
  beforeMount() {
    this.toggleLoad('加载中')
  }
}

</script>
<style lang="scss" scoped>
@import "../static/style/pages/pgHome.scss";

</style>
