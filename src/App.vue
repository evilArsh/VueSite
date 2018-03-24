<template>
  <div id="app">
    <v-cptipbar></v-cptipbar>
    <v-cprouter></v-cprouter>
    <v-cpheader></v-cpheader><!-- 
    <transition name="dim">
      <v-cpbigblack v-show="navShow"></v-cpbigblack>
    </transition> -->
    <transition name="left">
      <v-pgnavbar></v-pgnavbar>
    </transition>
    <v-cpbganimate></v-cpbganimate>
    <div class="mainContainer">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import cpTipBar from '@/components/common/cpTipBar'
import pgNavBar from '@/components/home/cpNavBar'
import cpHeader from '@/components/home/cpHeader'
import cpRouter from '@/components/home/cpRouter'
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
    'v-pgnavbar': pgNavBar,
    'v-cpheader': cpHeader,
    'v-cprouter': cpRouter,
    'v-cpbganimate':cpBGAnimate,
  },
  computed: {
  },
  methods: {
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
}

::selection {
  background-color: rgba(23, 23, 23, .5);
  color: #ededec;
}

;
body,
html {
  height: 100%;
}

a {
  text-decoration: none;
}

.mainContainer {
  transition: all .3s ease;
  overflow:auto;
  padding:0 50px 0 0;
}
</style>
