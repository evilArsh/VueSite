<template>
  <transition name="downUp" v-on:after-enter="afterAnimateEnter">
    <div class="tipBarContainer" v-show="tipBarVisible">
      <p class="msg fa" :class="tipStatus">{{tipBarMsg.data}}</p>
    </div>
  </transition>
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
    ...mapGetters(['tipBarVisible','tipBarMsg'])
  },
  mounted() {},
  methods: {
    ...mapActions(['closeTipBar']),
    // ...mapGetters(['tipBarMsg']),
    afterAnimateEnter:function(){
        let _self=this;
        setTimeout(function() {
            _self.closeTipBar();
        },2000);
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
<style lang="scss">
@import '../../static/style/pre.scss';
@import '../../static/style/animate.css';
.error {
  background-color: #000;
  color: red;
  &::before {
    color: red
  }
}

.success {
  background-color: #560b07;
  color: #00cee5;
  &::before {
    color: #00cee5
  }
}

.tipBarContainer {
  text-align: center;
  right:0;
  position: fixed;
  z-index: 999;
  max-width: 100%;
}

.msg {

  overflow: auto;
  opacity: .8;
  font-size: 14px;
  padding: 5px 10px 5px 0;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  @include bsha( 0 2px 2px 0 #9c9e7a);
  &::before {
    margin: 0 10px 0 10px;
  }
}

</style>
