<!-- 主页 -->
<template>
  <div class="homeContainer" :style="bgColor">
        <v-cpheader></v-cpheader>

    <v-cprouter></v-cprouter>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import cpRouter from '@/components/home/cpRouter'
import cpHeader from '@/components/home/cpHeader'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
    'v-cprouter': cpRouter,
    'v-cpheader': cpHeader,
  },
  computed: {
    ...mapGetters(['bgColor'])
  },
  methods: {
    beforeEnter:function(el){
      el.classList.remove("normal");
      el.classList.add("toggle");
    },
    enter:function(el,done){
      el.classList.remove("toggle");
      el.classList.add("normal");

    },
    leave:function(el,done){
      el.classList.remove("normal");
      el.classList.add("toggle");

    },
  },
  watch: {
  },
  beforeMount() {

  },
  mounted() {
  },
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import "../static/style/pages/pgHome.scss";

</style>
