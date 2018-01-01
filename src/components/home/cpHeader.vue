<template>
  <div class="headContainer" :style="bgColor">
    <span class="hide fa fa-bars" @click="toggleNavBar"></span>
    <span class="toHomeBar"><span class="logo"></span></span>
    <span class="hideBar fa" :class="changeTip" @click="toggle"></span>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
      tipDirection:true,
    }
  },
  components: {
  },
  methods: {
    ...mapActions(["toggleRouter","toggleNavVisible"]),
    ...mapGetters(["routerShow"]),
    toggle: function() {
      this.toggleRouter();
      this.tipDirection=this.routerShow();
    },
    toggleNavBar:function(){
      this.toggleNavVisible();
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters(["navShow","headBgColor"]),
    changeTip:function(){
      return{
        'fa-chevron-up':!this.tipDirection,
        'fa-chevron-down':this.tipDirection
      }
    },

    //头部动态背景色
    bgColor:function(){
      return{
        'backgroundColor':this.headBgColor
      }
    }
  },
  watch: {
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpHeader.scss';

</style>
