<template>
  <div class="tipBarContainer">
    <transition v-on:after-enter="afterEnter"
     v-on:before-enter="beforeEnter"
    v-on:enter="enter"
      name="downUp">
      <p class="msg fa" v-show='tipBarVisible' :class="tipStatus">{{tipBarMsg.data}}</p>
    </transition>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  data() {
    return {
      // msgSignal: this.tipBarMsg(),
      tipStatus: [],
      msg: ''
    }
  },
  watch: {
    tipBarMsg: function(val) {
      if (val.success !== undefined) {
        val.success ? this.setSuccessMsg(val.data) : this.setErrorMsg(val.data);
      }
    }
  },
  computed: {
    ...mapGetters(['tipBarVisible', 'tipBarMsg'])
  },
  mounted() {
    // this.setTipBarMsg({ data: '测试一下', success: true })
  },
  methods: {
    ...mapActions(['closeTipBar', 'setTipBarMsg']),
    beforeEnter: function(el) {
    },
    enter:function(el){console.log('data, ...args')},
    // ...mapGetters(['tipBarMsg']),
    afterEnter: function() {
      let _self = this;
     let flag = setTimeout(function() {
        _self.closeTipBar();
      }, 3000);
    },
    getStatusError: function() {
      return ['fa-exclamation-circle', 'error'];
    },
    getStatusSuccess: function() {
      return ['fa-check-circle', 'success'];
    },
    getStatusWarning: function() {},
    setErrorMsg: function(msg) {
      this.msg = msg;
      this.tipStatus = this.getStatusError();
    },
    setSuccessMsg: function(msg) {
      this.msg = msg;
      this.tipStatus = this.getStatusSuccess();
    },
    setWarningMsg: function(msg) {}
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpTipBar.scss';

</style>
