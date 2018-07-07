<template>
  <div id="app">
    <keep-alive>
      <v-wait></v-wait>
    </keep-alive>
    <v-cpbganimate></v-cpbganimate>
    <v-pghome></v-pghome>
    <!-- 测试用 -->
    <span :style="{position:'fixed',bottom:'0',left:'0',width:'50px',height:'50px',zIndex:'999',backgroundColor:'#000',color:'#fff'}" @click="demo">测试</span>
  </div>
</template>
<script>
import pgHome from './pages/pgHome'
import cpWait from '@/components/common/cpWait'
import cpBGAnimate from '@/components/common/cpBGAnimate'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      demoBool:false
    }
  },
  beforeCreate() {
    this.$ajax.initial();
  },
  components: {
    'v-wait': cpWait,
    'v-cpbganimate': cpBGAnimate,
    'v-pghome': pgHome
  },
  computed: {},
  methods: {
    ...mapActions(['setLoadMsg']),
    //测试用
    demo: function() {
        if (this.demoBool===false) {
          this.setLoadMsg('数据加载中...');
        }else{
          this.setLoadMsg('');
        }
        this.demoBool=!this.demoBool;
      }
    }
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
  position: relative;
  min-height: 100%;
}

::selection {
  background-color: rgba(23, 23, 23, .5);
  color: #ededec;
}

;
body,
html {}

a {
  text-decoration: none;
}

.mainContainer {}

</style>
