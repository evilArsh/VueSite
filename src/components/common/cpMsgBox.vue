<template>
  <div class="msgBoxContainer" ref="msgBox">
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
      tipStatus: [],
    }
  },
  watch: {
    msg(val) {
      if (val.success !== undefined) {
        val.success ? this.setSuccessMsg(val.data) : this.setErrorMsg(val.data);
      }
      let cls = ['msgBox_msg', 'fa', 'msgBox_ani', 'msgBox_bar'].concat(this.tipStatus);
      let id = 'bar' + (this.id++);
      let p = this.createEle('p', id, cls, val.data);
      this.$refs.msgBox.appendChild(p);
      let _ = this;
      document.getElementById(id).addEventListener('animationend', function() {
        _.$refs.msgBox.removeChild(this);
      })
    }
  },
  computed: {
    msg() {
      return this.$store.state.vxStatusManage.runningMsg;
    }
  },
  mounted() {},
  methods: {
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
      return ['fa-exclamation-circle', 'msgBox_error'];
    },
    getStatusSuccess: function() {
      return ['fa-check-circle', 'msgBox_success'];
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
.msgBox_msg {
  margin: 0 auto;
  overflow: auto;
  opacity: .8;
  font-size: 14px;
    padding: 15px 14px;
    margin: 1px 0;
    border-radius: 4px;
}

.msgBox_msg::before {
  margin: 0 10px 0 10px;
}

.msgBox_bar {
  position: relative;
  float: right;
}

.msgBox_ani {
  animation: msgBox 3s;
}

.msgBox_error {
  background-color: #000;
  color: red;
}

.msgBox_error::before {
  color: red
}

.msgBox_success {
  background-color: #091522;
  color: #00cee5;
}

.msgBox_success::before {
  color: #00cee5
}

</style>
<style lang="scss" scoped>
.msgBoxContainer {
    right: 0;
    position: absolute;
    top: 2%;
    overflow: hidden;
    z-index: 999;
    max-width: 200px;
}
</style>
