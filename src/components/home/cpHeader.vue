<template>
  <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" :css="false">
    <div ref="head" class="headContainer" :style="bgColor" v-show="isHeadShow">
    <v-pgnavbar></v-pgnavbar>

      <!-- 链接 -->
      <div class="link" @click="linkTo($event)">
        <a href="javascript:;"  tar="user" class="linkItem" v-show="isUserLogin">
        <img :src="userInfo.avatar" class="img logo" alt="">
      </a>
        <a href="javascript:;" tar="github" class="linkItem">
        <span class='logo fa fa-github'></span>
      </a>
        <a href="javascript:;" tar="weibo" class="linkItem">
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
    ...mapActions(['setUserInfo','setTipBarMsg']),
    linkTo:function(e){
      if(e.target&&e.target.nodeName==='A'||'IMG'||"SPAN"){
        let t=e.target.nodeName!=="A"?e.target.parentNode:e.target;
        let tar=t.getAttribute('tar');
        switch(tar){
          case 'user':this.$router.push({ path: '/userHome' });break;
          case 'github':window.open('https://github.com/evilArsh/VueSite');break;
          case 'weibo':this.setTipBarMsg({success:true,data:'暂无微博'});break;
        }
      }
    },
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
