<template>
  <div class="userHeadContainer">
    <img :src="userInfo.avatar" class="navLogo">
    <div class="userSet">
      <a href="javascript:;" class="userName">{{userInfo.nickName}}</a>
      <a href="javascript:;" class="setting fa fa-cog"></a>
    </div>
    <a href="javascript:;" class="writeBlog">写博客</a>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  data() {
    return {
    }
  },
  // watch:{
  //   userInfo:function(val){
  //     console.log(val)
  //     this.name=val.nickName;
  //     this.avatar=val.avatar;
  //   }
 // },
  computed:{
    ...mapGetters(['userInfo'])
  }
}

</script>
<style lang="scss">
@import '../../static/style/components/cpNavbar.scss'

</style>
