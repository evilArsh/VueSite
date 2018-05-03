<template>
  <div id="app">
    <v-cptipbar></v-cptipbar>
<!-- 
    <transition name="dim">
      <v-cpbigblack v-show="navShow"></v-cpbigblack>
    </transition> -->
    <v-cpbganimate></v-cpbganimate>
    <div class="mainContainer">
        <v-cpheader></v-cpheader>
        <v-pghome></v-pghome>
    </div>
  </div>
</template>
<script>
import pgHome from './pages/pgHome'
import cpTipBar from '@/components/common/cpTipBar'
import cpHeader from '@/components/home/cpHeader'
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
    'v-cpheader': cpHeader,
    'v-cpbganimate':cpBGAnimate,
    'v-pghome':pgHome
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
  min-height:100%;
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
  position:relative;
  min-height:100%;
  transition: all .3s ease;
}
</style>
