<template>
  <div id="app">
    <v-cptipbar></v-cptipbar>
<!-- 
    <transition name="dim">
      <v-cpbigblack v-show="navShow"></v-cpbigblack>
    </transition> -->
    <v-cpbganimate></v-cpbganimate>

        <v-pghome></v-pghome>
        <!-- 测试用 -->
<!--         <span :style="{position:'fixed',bottom:'0',left:'0',width:'50px',height:'50px',zIndex:'999'}" @click="demo">测试</span> -->

  </div>
</template>
<script>
import pgHome from './pages/pgHome'
import cpTipBar from '@/components/common/cpTipBar'
import cpBigBlack from '@/components/common/cpBigBlack'
import cpBGAnimate from '@/components/common/cpBGAnimate'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  beforeCreate(){
    this.$ajax.initial();
  },
  
  components: {
    'v-cptipbar':cpTipBar,
    'v-cpbganimate':cpBGAnimate,
    'v-pghome':pgHome
  },
  computed: {
  },
  methods: {
    ...mapActions(['toggleFoot','toggleHead','toggleNav','setTipBarMsg']),
    //测试用
    // demo:function(){
    // }
  },

}

</script>
<style src="./static/style/animate.css"></style>
<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: 'Microsoft YaHei', '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position:relative;
  min-height:100%;
}

::selection {
  background-color: rgba(23, 23, 23, .5);
  color: #ededec;
}

;
body,
html {
}

a {
  text-decoration: none;
}

.mainContainer {
}
</style>
