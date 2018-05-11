<!-- 注册  -->
<template>
  <div class="signContainer" :style="bgColor">
    <div class="box">
      <div class="item">
        <transition name="upDown">
          <span class="mail_tip fa fa-exclamation-circle" v-show="mailToggle">请输入正确的邮箱</span>
        </transition>
        <i class="i fa fa-user" :style="mailTagColor"></i>
        <input class="input lname" v-model="mail" type="text" placeholder="请输入邮箱">
      </div>
      <div class="item">
        <transition name="upDown">
          <span class="mail_tip fa fa-exclamation-circle" v-show="pwdToggle">长度6-15且两次密码应相同</span>
        </transition>
        <i class="i fa fa-lock" :style="pwdTagColor"></i>
        <input class="input lpwd" v-model="pwd" type="password" placeholder="请输入密码">
      </div>
      <div class="item">
        <transition name="upDown">
          <span class="mail_tip fa fa-exclamation-circle" v-show="rPwdToggle">长度6-15且两次密码应相同</span>
        </transition>
        <i class="i fa fa-lock" :style="rPwdTagColor"></i>
        <input class="input lpwd" v-model="rPwd" type="password" placeholder="请再次输入密码">
      </div>
      <div class="inup">
        <a href="javascript:;" class="signIn" @click="toLog">登录</a>
        <a href="javascript:;" @click="submit" class="main signUp">注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  data() {
    return {
      lock: false,
      mail: '',
      pwd: '',
      rPwd: '',
      mailToggle: false,
      pwdToggle: false,
      rPwdToggle: false,
      mailTagColor: {
        color: ''
      },
      pwdTagColor: {
        color: ''
      },
      rPwdTagColor: {
        color: ''
      }
    }
  },
  computed: {
    ...mapGetters(['bgColor', 'mailReg', 'pwdReg'])
  },
  methods: {
    ...mapActions(['submitDataFromServer']),
    toLog() {
      this.$router.replace('/sign/signIn')
    },
    setTagColor: function(tag, co) {
      tag.color = co;
    },
    submit() {
      if (this.lock) return;
      this.lock = true;
      let m = this.isMailMatch(this.mail),
        p = this.isPwdMatch(this.pwd),
        rp = this.isPwdMatch(this.rPwd);
      let _ = this;
      if (m && p && rp && p === rp) {
        const re = this.$ajax.register({ mail: this.mail, pwd: this.pwd })
          .then(function(res) {
            _.lock=false;
            _.submitDataFromServer(res.data);
            if(res.data.success){
              _.$router.push({path:'/'});
            }
          });
        return;
      }
      this.mailToggle = m ? false : true;
      this.pwdToggle = p ? false : true;
      this.rPwdToggle = rp && p === rp ? false : true;
    },
    isDataNull: function(val) {
      return val.length === 0 ? true : false;
    },
    isMailMatch: function(val) {
      return this.mailReg.test(val);
    },
    isPwdMatch: function(val) {
      return this.pwdReg.test(val);
    },
    setPwdStatus: function(val) {
      if (!this.isDataNull(val)) {
        this.isPwdMatch(val) ? this.setTagColor(this.pwdTagColor, "green") : this.setTagColor(this.pwdTagColor,
          "red");
        if (!this.isDataNull(this.rPwd)) {
          val === this.rPwd && this.isPwdMatch(this.rPwd) ? this.setTagColor(this.rPwdTagColor, "green") : this.setTagColor(
            this.rPwdTagColor,
            "red");
        }
      } else {
        this.setTagColor(this.pwdTagColor, "");
        this.isDataNull(this.rPwd) ? this.setTagColor(this.rPwdTagColor, "") : this.setTagColor(
          this.rPwdTagColor, "red");
      }
    }
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
          this.setTagColor(this.mailTagColor, "red")
        }
      }
    },
    pwd: function(val) {
      this.pwdToggle = false;
      this.setPwdStatus(val);
    },
    rPwd: function(val) {
      this.rPwdToggle = false;
      this.isDataNull(val) ? this.setTagColor(this.rPwdTagColor, "") :
        val === this.pwd && this.isPwdMatch(val) ? this.setTagColor(this.rPwdTagColor, "green") : this.setTagColor(
          this.rPwdTagColor, "red");
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/pages/pgSign.scss';

</style>
