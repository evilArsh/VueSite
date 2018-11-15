<!-- 主页 -->
<template>
  <div id="home" class="homeContainer">
    <v-cpheader></v-cpheader>
    <v-cprouter></v-cprouter>
    <transition name="fade" mode="out-in">
      <keep-alive :include="['blogMenu']">
      <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import cpRouter from "@/components/home/cpRouter";
import cpHeader from "@/components/home/cpHeader";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    "v-cprouter": cpRouter,
    "v-cpheader": cpHeader
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
@import "../static/style/pages/pgHome.scss";
</style>
