<!-- 头部router导航 search -->
<!-- 路由结构  -->
<template>
  <div class="routerContainer" :class="{isShow:routerShow}">
    <div class="router" @click="toWhere">当前位置：
      <span v-for="(item,index) of routerStack.stack" :index="index+1" :title="item.name" class="routerList"><i>{{item.name}}</i></span>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
      isHome: false,
      routerLength: Number,
      userBack: false
    }
  },
  components: {},
  mounted() {
    let { fullPath, name } = this.$route;
    fullPath === '/' ? this.isHome = true : this.isHome = false;
    this.setPath({ fullPath, name }),
      this.routerLength = this.getStackLength();
  },
  computed: {
    ...mapGetters(["routerStack", "routerShow"])
  },
  watch: {
    '$route' (to, from) {
      let { fullPath, name, meta } = this.$route;
      //监听路由变化改变Header.vue
      fullPath === '/' ? this.isHome = true : this.isHome = false;
      this.alterPath({ fullPath, name, meta });
      this.routerLength = this.getStackLength();
    }
  },
  methods: {
    ...mapActions(["setPath", "delPath", "alterPath", "clearPath"]),
    ...mapGetters(["getStackLength", "getPath"]),
    toHome: function(event) {
      event.stopPropagation();
      if (!this.isHome) {
        this.clearPath();
        this.$router.replace('/');
        let { fullPath, name } = this.$route;
        this.setPath({ fullPath, name });
        this.isHome = true;
      }
    },
    toWhere: function(e) {
      if (e.target && e.target.nodeName === "I") {
        let p = e.target.parentNode;
        let index = p.getAttribute('index');
        index = parseInt(index);
        if (index !== this.routerLength) {
          this.userBack = true;
          this.delPath(index);
          //会触发'$route'
          this.$router.replace(this.getPath().fullPath);
        }
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpRouter.scss';
</style>
