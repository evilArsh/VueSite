<template>
  <div id="app">
    <v-cprouter></v-cprouter>
    <v-cpheader></v-cpheader>
    <transition name="dim">
      <v-cpbigblack v-show="navShow"></v-cpbigblack>
    </transition>
    <transition name="left">
      <v-pgnavbar v-show="navShow"></v-pgnavbar>
    </transition>
    <v-cpbganimate></v-cpbganimate>
    <div class="mainContainer" @click="hideNav">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
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
  components: {
    'v-pgnavbar': pgNavBar,
    'v-cpheader': cpHeader,
    'v-cprouter': cpRouter,
    'v-cpbigblack': cpBigBlack,
    'v-cpbganimate':cpBGAnimate,
  },
  computed: {
    ...mapGetters(['navShow', 'activeCom'])
  },
  methods: {
    ...mapActions(['setActiveCom', 'setNavVisible']),
    hideNav: function() {
      this.setNavVisible(false);
    }
  },

}

</script>
<style src="./static/style/animate.css"></style>
<style lang="scss">
@import './static/style/Pre.scss';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Microsoft YaHei', '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  min-width: 100%;
  /*transform: translateX(70px);*/
}
</style>
