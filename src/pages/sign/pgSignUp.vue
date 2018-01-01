<!-- 注册  -->
<template>
  <div class="signContainer">
    <div class="box">
      <div class="item"><i class="i fa fa-user"></i>
        <input  class="input lname" type="text" placeholder="请输入邮箱">
      </div>
      <div  class="item"><i class="i fa fa-lock"></i>
        <input class="input lpwd" type="password" placeholder="请输入密码">
      </div>
      <div  class="item"><i class="i fa fa-lock"></i>
        <input class="input lpwd" type="password" placeholder="请再次输入密码">
      </div>
      <div class="inup">
        <a href="javascript:;" class="signIn"  @click="toLog">登录</a>
        <a href="javascript:;" class="main signUp">注册</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    toLog() {
      this.$router.replace('/sign/signIn')
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/pages/pgSign.scss';

</style>
