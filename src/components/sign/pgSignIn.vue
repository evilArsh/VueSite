<!-- 登录  -->
<template>
  <div class="signContainer">
    <div class="box">
      <div class="item">
        <transition name="upDown">
          <span class="mail_tip fa fa-exclamation-circle" v-show="mailToggle">请输入正确的邮箱</span>
        </transition>
        <i class="i fa fa-user" :style="mailTagColor"></i>
        <input v-model="mail" class="input" type="text" placeholder="请输入账号或邮箱">
      </div>
      <div class="item">
        <transition name="upDown">
          <span class="mail_tip fa fa-exclamation-circle" v-show="pwdToggle">请输入正确的密码</span>
        </transition>
        <i class="i fa fa-lock" :style="pwdTagColor"></i>
        <input v-model="pwd" class="input" type="password" placeholder="请输入密码">
      </div>
      <div class="inup">
        <a href="javascript:;" @click="submit" class="main signIn">登录</a>
      </div>
      <a href="javascript:;" class="forget">忘记密码?</a>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      mailTagColor: {
        color: ""
      },
      pwdTagColor: {
        color: ""
      },
      mail: "",
      pwd: "",
      pwdToggle: false,
      mailToggle: false
    };
  },
  methods: {
    ...mapActions(["setLoginData","setAccessToken"]),
    toReg() {
      this.$router.replace("/sign/signUp");
    },
    setTagColor: function(tag, co) {
      tag.color = co;
    },
    submit: function() {
      let m = this.isMailMatch(this.mail),
        n = this.isDataNull(this.pwd);
      let _ = this;
      if (m && !n) {
        //提交数据
        this.$ajax
          .login({ mail: this.mail, pwd: this.pwd })
          .then(function(res) {
            _.setLoginData(res.data);
            if (res.data.success) {
              _.setAccessToken(res.data.package.accessToken);
              _.$router.push({ path: "/" });
            }
          });
        return;
      }
      this.mailToggle = m ? false : true;
      this.pwdToggle = n ? true : false;
    },
    isDataNull: function(val) {
      return val.length === 0 ? true : false;
    },
    isMailMatch: function(val) {
      return this.mailReg.test(val);
    }
  },
  computed: {
    ...mapGetters(["mailReg"])
  },
  watch: {
    mail: function(val) {
      this.mailToggle = false;
      if (this.isDataNull(val)) {
        this.setTagColor(this.mailTagColor, "");
      } else {
        if (this.isMailMatch(val)) {
          this.setTagColor(this.mailTagColor, "green");
        } else {
          this.setTagColor(this.mailTagColor, "red");
        }
      }
    },
    pwd: function(val) {
      this.pwdToggle = false;
      val.length === 0
        ? this.setTagColor(this.pwdTagColor, "")
        : this.setTagColor(this.pwdTagColor, "green");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../static/style/pages/pgSign.scss";
@import "../../static/style/animate.css";
</style>
