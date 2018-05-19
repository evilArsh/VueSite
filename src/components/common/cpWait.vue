<!-- 等待 -->
<template>
  <div class="waitContainer" v-show="isWaitShow">
    <div class="wait"></div>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  data() {
    return {

    };
  },
  computed:{
    ...mapGetters(['isWaitShow'])
  },
  watch:{
    isWaitShow(val){

    }
  },
  methods: {}
};

</script>
<style lang="scss" scoped>
$bdr: 5px;
$w_scale:50px;
.waitContainer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
    background-color: rgba(21, 21, 21, 0.83);
  z-index: 999;
  .wait {
    top: 30%;
    margin: 0 auto;
    width: $w_scale;
    height: $w_scale;
    position: relative;
    border-radius: 50%;
      &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: solid $bdr #ccc;
  }
  &::before {
    content: ' ';
    animation: rotate 1s linear;
    animation-iteration-count: infinite;
    position: absolute;
    width: 100%;
    z-index: 99;
    height: 100%;
    border: solid $bdr;
    border-radius: 50%;
    border-color: #d12d04  transparent;
  }
  }

}

</style>
