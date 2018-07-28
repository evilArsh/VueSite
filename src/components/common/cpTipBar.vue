<template>
  <div class="tipBarContainer">
    <span class="tipBar_msg _animatedBar off" id="tip_t1">{{ms}}</span>
    <span class="tipBar_msg _animatedBar off" id="tip_t2">{{ms}}</span>
    <span class="tipBar_msg _animatedBarLoad ok off" id="tip_l1"><span class="wait"></span><span class="load">{{loadms}}</span></span>
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
      active: 'tip_t1',
      //互斥的提示框
      ms: '',
      loadms:''
    }
  },
  watch: {
    msg(val) {
      if (val.success !== undefined) {
        this.ms = val.data;
        this.closeLoad('tip_l1');
        this.delClass(this.active, 'error');
        this.delClass(this.active, 'ok');
        this.close(this.active);
        this.begin(this.newActive());
        if (val.success === true) {
          this.addClass(this.active, 'ok');
        } else {
          this.addClass(this.active, 'error');
        }
      }
    },
    loadMsg(val){
      if(val.length>0){
        //关闭互斥提示框
        this.close(this.active);
        this.loadms=val;
        this.beginLoad('tip_l1');
      }else{
        this.closeLoad('tip_l1');
      }
    }
  },
  computed: {
    msg() {
      return this.$store.state.vxStatusManage.tipBarMsg;
    },
    loadMsg(){
      return this.$store.state.vxStatusManage.loadMsg;
    }
  },
  mounted() {
        let _ = this;
    // document.getElementById('tip_t1').addEventListener('animationend', function() { 
    //   _.close('tip_t1') })
    // document.getElementById('tip_t2').addEventListener('animationend', function() {
    //   _.close('tip_t2');
    // })
  },
  methods: {
    newActive() {
      if (this.active === 'tip_t1') {
        this.active = 'tip_t2';
      } else {
        this.active = 'tip_t1';
      }
      return this.active;
    },
    beginLoad(id){
      this.delClass(id, 'off');
      this.addClass(id, 'slideInDown');
    },
    closeLoad(id){
      this.addClass(id, 'off');
      this.delClass(id, 'slideInDown');
    },
    begin(id) {
      this.delClass(id, 'off');
      this.addClass(id, 'slide');
    },
    //终止动画并隐藏
    close(id) {
      this.addClass(id, 'off');
      this.delClass(id, 'slide');
    },
    delClass(id, className) {
      document.getElementById(id).classList.remove(className);
    },
    addClass(id, className) {
      if (document.getElementById(id).className.match(className) === null) {
        document.getElementById(id).classList.add(className);
      }
    }
  }
}

</script>
<style lang="css">
.tipBar_msg {
  font-size: 14px;
  display: inline-block;
  padding: 10px 31px;
      border-radius: 3px;
}
.stop {
  animation-play-state: paused;
}
.slide {
  animation-name: tipBar;
}
.slideInDown {
  animation-name:slideInDown;
}

._animatedBar {
  animation-duration: 4s;
  animation-fill-mode: both;
}
._animatedBar.infinite {
  animation-iteration-count: infinite;
}
._animatedBarLoad {
  animation-duration: .3s;
  animation-fill-mode: both;
}
._animatedBarLoad.infinite {
  animation-iteration-count: infinite;
}
.error {
  background-color: #7b2f0c;
  color: #fff;
}
.off {
  display: none;
}
.ok {
  background-color: #494b67;
  color: #ffffff;
}
@keyframes tipBar {
  from {
    transform: translate3d( 0, -100%, 0);
  }
  10%,
  80% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
  90% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
  100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0,-100%0, 0);
    opacity:0.8
  }
  to {
    transform: translate3d(0, -100%, 0);
    opacity: 0
  }
}
@keyframes slideInDown {
  from {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
<style lang="scss" scoped>
$bdr: 2px;
$w_scale:20px;
.tipBarContainer {
  text-align: center;
  position: fixed;
  right: 0;
  left: 0;
  height: 1px;
  z-index: 999;
}
  .wait {
    margin: 0 15px 0 0px;
    width: $w_scale;
    float: left;
    height: $w_scale;
    position: relative;
    display: inline-block;
    border-radius: 50%;
  &::before {
    content: '';
    animation: rotate 1s linear;
    animation-iteration-count: infinite;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 99;
    height: 100%;
    border: solid 2px;
    border-radius: 50%;
    border-color: #d12d04 transparent;
  }
  }
  .load{
    vertical-align: middle;
    overflow: hidden;
  }
</style>
