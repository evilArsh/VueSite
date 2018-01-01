<!-- 登录  -->
<template>
  <div class="signContainer">
    <div class="box">
      <div class="item">
      	<i class="i fa fa-user"></i>
        <input class="input lname" type="text" placeholder="请输入账号或邮箱">
      </div>
      <div class="item">
      	<i class="i fa fa-lock"></i>
        <input class="input lpwd" type="password" placeholder="请输入密码">
      </div>
      <div class="inup">
        <a href="javascript:;" class="signIn" @click="toReg">注册</a>
        <a href="javascript:;" class="main signUp">登录</a>
      </div>
      <a href="javascript:;" class="forget">忘记密码?</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    toReg() {
      this.$router.replace('/sign/signUp')
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/pages/pgSign.scss';

</style>
