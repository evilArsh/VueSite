<!-- 主页 -->
<template>
  <div id="home" class="homeContainer">
    <pgnavbar></pgnavbar>
    <cpheader></cpheader>
    <!-- <cprouter></cprouter> -->
    <transition name="fade" mode="out-in">
      <keep-alive :include="['blogMenu']">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import pgNavBar from "@/components/home/cpNavBar";
import cpRouter from "@/components/home/cpRouter";
import cpHeader from "@/components/home/cpHeader";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    pgnavbar: pgNavBar,
    cprouter: cpRouter,
    cpheader: cpHeader
  },
  computed: {},
  methods: {},
  watch: {},
  beforeMount() {},
  mounted() {},
  beforeMount() {}
};
</script>
<style lang="scss" scoped>
@import "../../static/style/components/pgHome.scss";
</style>
