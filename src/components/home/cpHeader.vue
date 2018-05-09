<template>
  <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" :css="false">
    <div ref="head" class="headContainer" :style="bgColor" v-show="isHeadShow">
    <v-pgnavbar></v-pgnavbar>

      <!-- 链接 -->
      <div class="link">
        <a href="javascript:;" class="linkItem" v-show="isUserLogin">
        <img :src="userInfo.avatar" class="img logo" alt="">
      </a>
        <a href="javascript:;" class="linkItem">
        <span class='logo fa fa-github'></span>
      </a>
        <a href="javascript:;" class="linkItem">
        <span class='logo fa fa-weibo'></span>
      </a>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import pgNavBar from '@/components/home/cpNavBar'
export default {
  props: {},
  data() {
    return {}
  },
  components: {
    'v-pgnavbar': pgNavBar,
  },
  methods: {
    ...mapActions(['setUserInfo']),
    beforeEnter: function(el) {
      el.classList.remove("normal");
      el.classList.add("toggle");
    },
    enter: function(el, done) {
      el.classList.remove("toggle");
      el.classList.add("normal");

    },
    leave: function(el, done) {
      el.classList.remove("normal");
      el.classList.add("toggle");

    }
  },
  mounted() {
    let _ = this;
    this.$ajax.getUserInfo().then((res)=> {
      _.setUserInfo(res.data)
    });
  },
  computed: {
    ...mapGetters(["bgColor", "isHeadShow", 'userInfo','isUserLogin']),
  },
  watch: {

  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpHeader.scss';

</style>
