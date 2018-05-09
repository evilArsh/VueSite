<template>
  <div class="blogContentContainer">
    <div class="shell">
    <span class="close"></span>
    <div class="headShell">
    <span class="type">{{data.blog_type}}</span>
    <p class="title">{{data.blog_title}}
    </p>
</div>
    <div class="content" id="content"></div>
    <div class="footer">
      <span class="user">{{data.userNickName}}</span>
      <span class="time">{{data.blog_time}}</span>
    </div>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      data:{
        userNickName:'',
        blog_title:'',
        blog_time:'',
        blog_type:'',
        blog_content:'',
        blog_view:''
      }
    }
  },
  created(){
    this.getDataByID(this.$route)
  },
  components: {},
  computed: {
    ...mapGetters(['bgColor'])
  },
  methods: {
    setContent:function(){
      document.querySelector('#content').innerHTML=this.data.blog_content;
    },
    getDataByID:function(route){
      let id=route.params.id;
      const _=this;
      this.$ajax.getBlogContent(id).then(function(res){
        if(res.data.success){
          _.data=Object.assign({},res.data.package[0]);
          _.setContent();
        }
      })
    }
  },
  watch: {
    '$route' :'getDataByID'
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpBlogContent.scss';

</style>
