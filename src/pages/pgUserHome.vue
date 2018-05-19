<!-- 用户主页 -->
<template>
  <div class="userHomeContainer">
    <ul class="list" @click="changeCp($event)">
      <li class="listItem"><a href="javascript:;" tar="info">资料</a></li>
      <li class="listItem"><a href="javascript:;" tar="avatar">头像</a></li>
      <li class="listItem"><a href="javascript:;" tar="blog">我的博客</a></li>
    </ul>
    <transition mode="out-in" name="info">
      <div class="infoContainer" v-if="activeDiv==='info'" key="info">
        <div class="infoItem">
          <div class="item">
            <span class="infoDescribe">邮箱</span>
            <span class="infoValue">{{userInfo.mail}}</span>
          </div>
          <div class="item">
            <span class="infoDescribe">昵称</span>
            <input type="text" class="infoValue input" :placeholder="userInfo.nickName" v-model="userNickName">
          </div>
          <button class="btn save" @click="update">保存更改</button>
          <button class="btn quit" @click="loginOut">注销登录</button>
        </div>
      </div>
      <div class="avatarContainer" v-if="activeDiv==='avatar'" key="avatar">
        <div class="infoItem">
          <div class="imgOuter">
            <img :src="userInfo.avatar" alt="" class="img">
          </div>
          <p class="tip">图片大小不得超过5mb</p>
          <input type="file" class="choice" ref="avatar">
          <button class="btn save" @click="upload">上传</button>
        </div>
      </div>
      <div class="blogContainer" v-if="activeDiv==='blog'" key="blog">
        <div class="infoItem">
          <router-link :to="{ path: '/blogContent/'+item.blog_id}" class="blogModel" v-for="item in blogList" :key="item.blog_id">
            <span class="title">{{item.blog_title}}</span>
            <span class="time ">{{item.blog_time}}</span>
          </router-link>
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
      lock: false,
      activeDiv: 'info',
      blogList: [],
      userNickName: '',
      old:'',
      oldImg:''
    }
  },
  components: {},
  computed: {
    ...mapGetters(['bgColor', 'userInfo'])
  },
  methods: {
    ...mapActions(['setBlogList', 'submitDataFromServer', 'setNickName', 'setAvatarURL', 'cleanLogin','toggleWait']),
    ...mapGetters(['getUserID']),
    getBlog: function(queryAfter, number) {
      const _ = this;
      let id = this.getUserID();
      if (parseInt(id) >= 0) {
        this.$ajax.getUserBlogList(this.getUserID(), queryAfter, number).then(function(res) {
          _.setBlogList(res.data);
          if (res.data.success) {
            _.pushData(res.data.package);
          }
        });
      }
    },
    upload: function() {
      const _ = this;
      if (this.lock) return;
      this.lock = true;

      //$('#ee')[0].files.length ? $('#ee')[0].files[0] : null;
      const img = this.$refs.avatar.files.length ? this.$refs.avatar.files[0] : null;
      if (!img || ((img.size) / (1 << 20)) >= 5) {
        this.submitDataFromServer({ success: false, data: '图片大小不符合' });
        return;
      }
      if(img.name===this.oldImg)return;
      this.toggleWait(true);

      var form = new FormData();
      form.append('img', img, img.name);
      this.$ajax.upload(this.getUserID(), form).then(function(res) {
      _.toggleWait(false);

        _.submitDataFromServer(res.data);
        _.lock = false;
        if (res.data.success) {
          _.setAvatarURL(img.name);
          _.oldImg=img.name;
        }
      });
    },
    update: function() {
      if (this.lock) return;
      if(this.old===this.userNickName)return;
      this.toggleWait(true);
      this.lock = true;
      const _ = this;
      if (this.userNickName.length) {
        this.$ajax.updateUser(this.getUserID(), {
          userNickName: this.userNickName
        }).then(function(res) {
      _.toggleWait(false);
          _.submitDataFromServer(res.data);
          _.lock = false;
          if (res.data.success) {
            _.old=_.userNickName;
            _.setNickName(_.userNickName);
          }
        })
      }
    },
    loginOut: function() {
      const _ = this;
      if (!isNaN(parseInt(this.getUserID()))) {
      this.toggleWait(true);

        this.$ajax.loginOut(this.getUserID()).then(function(res) {
      _.toggleWait(true);

          _.submitDataFromServer(res.data);
          if (res.data.success) {
            _.cleanLogin();
            _.$router.push({ path: '/' });
          }
        })
      };
    },
    setActiveDiv: function(val) {
      this.activeDiv = val;
    },
    changeCp: function(e) {
      if (e.target && e.target.nodeName === 'A') {
        let tar = e.target.getAttribute('tar');
        this.setActiveDiv(tar);
      }
    },
    pushData: function(data) {
      for (let i = 0; i < data.length; i++) {
        this.blogList.push(data[i]);
      }
    }
  },
  watch: {
  },
  beforeMount() {

  },
  created() {
    if (isNaN(parseInt(this.getUserID()))) {
      this.submitDataFromServer({ success: false, data: '请先登录' });
      this.$router.push('/sign/signIn');
    }
  },
  mounted() {
    this.getBlog(0, 8);
  },
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import "../static/style/pages/pgUserHome.scss"

</style>
