<template>
  <div id="app">
    <v-cpbganimate></v-cpbganimate>
    <v-cptipbar></v-cptipbar>
    <v-cpruntip></v-cpruntip>
    <v-pghome></v-pghome>
    <!-- 测试用 -->
    <!-- <span :style="{position:'fixed',bottom:'0',left:'0',width:'50px',height:'50px',zIndex:'999',backgroundColor:'#000',color:'#fff'}" @click="demo">测试</span> -->
  </div>
</template>
<script>
import cpRunTip from "@/components/common/cpMsgBox";
import cpTipBar from "@/components/common/cpTipBar";
import pgHome from "./pages/pgHome";
import cpBGAnimate from "@/components/common/cpBGAnimate";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      demoBool: false
    };
  },
  beforeCreate() {
    this.$ajax.initial();
  },
  components: {
    "v-cpruntip": cpRunTip,
    "v-cptipbar": cpTipBar,
    "v-cpbganimate": cpBGAnimate,
    "v-pghome": pgHome
  },
  computed: {},
  methods: {
    ...mapActions(["toggleLoad", "runMsg"]),
    //测试用
    demo: function() {
      this.runMsg("go");
    }
  }
};
</script>
<style src="./static/style/animate.css"></style>
<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  min-height: 100%;
}

::selection {
  background-color: rgba(23, 23, 23, 0.5);
  color: #ededec;
}
a {
  text-decoration: none;
}
</style>
