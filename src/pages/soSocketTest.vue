<!--socket测试-->
<template>
  <div>
    <div ref="msgbox">

    </div>
    <p>{{msg}}</p>
    <button @click="demo1">测试1</button>
    <button @click="con">连接</button>
    <button @click="close">关闭</button>
  </div>
</template>

<script>
import * as _io from "socket.io-client";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      io: null
    };
  },

  methods: {
    setMsg(msg) {
      let p = document.createElement('p');
      if(typeof msg==='object'){
        msg=JSON.stringify(msg);
      }
      p.innerText = JSON.stringify(msg);
      this.$refs.msgbox.appendChild(p);
    },
    con() {
      let _self = this;
      this.io = _io(process.env.SOCKET, {
        query: {
          room: "demo",
          userId: `client_${Math.random()}`
        }
      });
      this.io.on("res", function(msg) {
        _self.setMsg(msg);
      });
      this.io.on("online", function(msg) {
        _self.setMsg(msg);
      });
      this.io.on("connect", function() {
        _self.setMsg(`${_self.io.id}加入了`);
      });
      this.io.on("disconnect", function() {
        _self.setMsg(`${_self.io.id}离开了`);
      });
    },
    close() {},
    demo1() {
      this.io.emit("req", "dasd");
    }
  }
};
</script>

<style scoped>
</style>