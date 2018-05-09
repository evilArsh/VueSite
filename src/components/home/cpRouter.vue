<!-- 头部router导航 search -->
<!-- 路由结构  -->
<template>
  <div class="routerContainer">
    <div class="router" @click="toWhere">当前位置：
      <span v-for="(item,index) in routerStack.stack" :index="index+1" :title="item.name" class="routerList"><i>{{item.name}}</i></span>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
      routerLength: Number,
      userBack: false
    }
  },
  components: {},
  mounted() {
    //路由初始化
    this.setPath({ fullPath: '/', name: '首页' });
    this.routerLength = this.getStackLength();
  },
  computed: {
    ...mapGetters(["routerStack"])
  },
  watch: {
    '$route' (to, from) {
      // console.log('to',to,'from',from)
      let { fullPath, name, meta } = to;
      this.alterPath({ fullPath, name, meta });
      this.routerLength = this.getStackLength();
    }
  },
  methods: {
    ...mapActions(["setPath", "delPath", "alterPath", "clearPath"]),
    ...mapGetters(["getStackLength", "getPath"]),
    toWhere: function(e) {
      if (e.target && e.target.nodeName === "I") {
        let p = e.target.parentNode;
        let index = p.getAttribute('index');
        index = parseInt(index);
        if (index !== this.routerLength) {
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
