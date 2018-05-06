<!-- 用户主页 -->
<template>
  <div class="userHomeContainer">
    <ul class="list" @click="changeCp($event)">
      <li class="listItem"><a href="javascript:;" tar="info">资料</a></li>
      <li class="listItem"><a href="javascript:;" tar="avatar">头像</a></li>
      <li class="listItem"><a href="javascript:;" tar="blog">我的博客</a></li>
    </ul>
    <transition  mode="out-in" name="info"
    >
      <div class="infoContainer" v-if="activeDiv==='info'" key="info">
        <div class="infoItem">
          <div class="item">
            <span class="infoDescribe">邮箱</span>
            <span class="infoValue">1183520543@qq.com</span>
          </div>
          <div class="item">
            <span class="infoDescribe">昵称</span>
            <input type="text" class="infoValue input" value="吴小龙">
          </div>
          <button class="save">保存更改</button>
        </div>
      </div>
      <div class="avatarContainer" v-if="activeDiv==='avatar'" key="avatar">
        <div class="infoItem">
        <div class="imgOuter">
          <img src="../assets/logo.png"  alt="" class="img">
        </div>
        <input type="file" class="choice">
       <button class="save">上传</button>
        </div>
       </div>
      <div class="blogContainer" v-if="activeDiv==='blog'" key="blog">
        <div class="infoItem">
          <a  href="javascript:;" class="blogModel">
            <span class="title">怎样学vuejs</span>
            <span class="time">2018-12-12</span>
          </a>
                    <a  href="javascript:;" class="blogModel">
            <span class="title">怎样学vuejs</span>
            <span class="time">2018-12-12</span>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeDiv:'blog'
    }
  },
  components: {},
  computed: {
    ...mapGetters(['bgColor'])
  },
  methods: {
    setActiveDiv:function(val){
      this.activeDiv=val;
    },
    changeCp:function(e){
      if(e.target&&e.target.nodeName==='A'){
        let tar=e.target.getAttribute('tar');
        this.setActiveDiv(tar);
      }
    },
    beforeEnter:function(el){
      // el.classList.remove("in");
      // el.classList.remove("afterLeave");
      // el.classList.add("leave");
    },
    enter:function(el,done){
      // el.classList.remove("leave");
      // el.classList.add("in");
    }, 
    leave:function(el,done){
      // el.classList.remove("in");
      // el.classList.add("leave");
    },
  },
  watch: {},
  beforeMount() {

  },
  mounted() {},
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import "../static/style/pages/pgUserHome.scss"

</style>
