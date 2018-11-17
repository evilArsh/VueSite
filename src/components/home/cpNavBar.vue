<!-- 导航侧边栏 -->
<template>
  <div class="homeNavContainer">
    <div class="navContainer">
      <div class="logo">
        <!-- <img src="" alt=""> -->
        <p>VIVCODE</p>
        <span class="toggle"></span>
      </div>
      <ul class="list">
        <li class="item">
          <a href="javascript:;" class="link">
            <i class="slogo fa fa-home"></i>
            <p class="title">首页</p>
          </a>
        </li>
        <li class="item">
          <a href="javascript:;" class="link">
            <i class="slogo fa fa-comments"></i>
            <p class="title">聊天室</p>
          </a>
        </li>
        <li class="item">
          <a href="javascript:;" class="link">
            <i class="slogo fa fa-android"></i>
            <p class="title">博客</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {},
  computed: {
    ...mapGetters(["isNavShow"])
  },
  methods: {
    beforeEnter: function(el) {
      console.log(el);
    },
    hideNav: function() {
      this.$refs.black.classList.remove("black");
      this.$refs.bar.classList.add("hide");
    },
    showNav: function() {
      this.$refs.bar.classList.remove("hide");
      this.$refs.black.classList.add("black");
    },
    componentHandle: function(e) {
      this.$refs.black.classList.remove("black");
      this.$refs.bar.classList.add("hide");
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "../../static/style/components/cpNavbar.scss";
</style>
