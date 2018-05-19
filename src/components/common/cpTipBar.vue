<template>
  <div class="tipBarContainer" ref="tipBar">
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
      id: 1,
      // msgSignal: this.tipBarMsg(),
      tipStatus: [],
    }
  },
  watch: {
    msg(val) {
      if (val.success !== undefined) {
        val.success ? this.setSuccessMsg(val.data) : this.setErrorMsg(val.data);
      }
      let cls = ['tipBar_msg', 'fa', 'tipBar_ani', 'tipBar_bar'].concat(this.tipStatus);
      let id = 'bar' + (this.id++);
      let p = this.createEle('p', id, cls, val.data);
      this.$refs.tipBar.appendChild(p);
      let _ = this;
      document.getElementById(id).addEventListener('animationend', function() {
        _.$refs.tipBar.removeChild(this);
      })
    }
  },
  computed: {
    msg() {
      return this.$store.state.vxStatusManage.tipBarMsg;
    }
  },
  mounted() {},
  methods: {
    ...mapActions(['closeTipBar', 'setTipBarMsg']),
    //cls参数为array,为初始的类
    createEle: function(el, id, cls, msg) {
      let p = document.createElement(el);
      p.setAttribute('class', cls.join(' '));
      p.setAttribute('id', id);
      p.innerText = msg;
      return p;
    },
    beforeEnter: function(el) {},
    afterEnter: function() {
      let _self = this;
    },
    getStatusError: function() {
      return ['fa-exclamation-circle', 'tipBar_error'];
    },
    getStatusSuccess: function() {
      return ['fa-check-circle', 'tipBar_success'];
    },
    getStatusWarning: function() {},
    setErrorMsg: function(msg) {
      this.tipStatus = this.getStatusError();
    },
    setSuccessMsg: function(msg) {
      this.tipStatus = this.getStatusSuccess();
    },
    setWarningMsg: function(msg) {}
  }
}

</script>
<style lang="css">
.tipBar_msg {
  margin: 0 auto;
  overflow: auto;
  opacity: .8;
  font-size: 14px;
    padding: 15px 14px;
    margin: 1px 0;
    border-radius: 4px;
}

.tipBar_msg::before {
  margin: 0 10px 0 10px;
}

.tipBar_bar {
  position: relative;
  float: right;
}

.tipBar_ani {
  animation: tipBar 3s;
}

.tipBar_error {
  background-color: #000;
  color: red;
}

.tipBar_error::before {
  color: red
}

.tipBar_success {
  background-color: #091522;
  color: #00cee5;
}

.tipBar_success::before {
  color: #00cee5
}

</style>
<style lang="scss" scoped>
@import '../../static/style/components/cpTipBar.scss';

</style>
