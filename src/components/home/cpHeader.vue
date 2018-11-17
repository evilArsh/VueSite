<template>
  <div class="headerContainer">
    <div class="barCon">
      <ul class="listh">
        <li class="itemh">
          <span class="barc">
            <i class="bari fa fa-bell"></i>
          </span>
        </li>
        <li class="itemh">
          <i></i>
        </li>
        <li class="itemh">
          <div class="user">
            <span class="nameh">Jack Sparrow</span>
            <i class="down fa fa-chevron-down"></i>
          </div>
            <img class="imgh" src="../../assets/logo.png" alt="">
        </li>
      </ul>
    </div>
    <div class="search">
      <i class="search fa fa-search"></i>
      <input type="text" class="input" placeholder="搜一搜">
    </div>
  </div>
  </transition>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setUserInfo", "tipMsg"]),
    ...mapGetters(["getAccessToken"])
  },
  mounted() {
    // let _ = this;
    // this.$ajax.getUserInfo(this.getAccessToken()).then((res)=> {
    //   _.setUserInfo(res.data)
    // });
  },
  computed: {
    ...mapGetters(["userInfo", "isUserLogin"])
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "../../static/style/components/cpHeader.scss";
</style>
