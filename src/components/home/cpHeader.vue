<template>
  <div class="headContainer" :style="bgColor">
    <span class="hide fa fa-bars" @click="toggleNavBar"></span>
    <div class="toHomeBar"><a href="#" class="logo"></a></div>
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
    ...mapGetters(["navShow","bgColor"]),
    changeTip:function(){
      return{
        'fa-chevron-up':!this.tipDirection,
        'fa-chevron-down':this.tipDirection
      }
    },
  },
  watch: {
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpHeader.scss';

</style>
