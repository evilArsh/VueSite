<template>
  <div class="blogContentContainer">
    <div class="shell">
    <span class="close"></span>
    <div class="headShell">
    <span class="type">{{data.blog_type}}</span>
    <p class="title">{{data.blog_title}}
    </p>
</div>
    <div class="content" v-html="content"></div>
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
    ...mapGetters(['bgColor']),
    content:function(){
    return this.data.blog_content;
  }
  },
  methods: {
    getDataByID:function(route){
      let id=route.params.id;
      const _=this;
      this.$ajax.getBlogContent(id).then(function(res){
        if(res.data.success){
          _.appendImg(res.data.package[0]);
          _.data=Object.assign({},res.data.package[0]);
        }
      })
    },
    //给img标签src属性填值
    appendImg:function(data){
      if(!data.blog_img) return;
      let img=data.blog_img.split(')(');
      let flag=0;
     while(new RegExp(/([ ]src[>])/).test(data.blog_content)){
      let w=" src="+img[flag]+">";
      data.blog_content=data.blog_content.replace(RegExp.$1,w);
      flag++;
     }
    }
  },
  watch: {
    '$route' :'getDataByID'
  }
}

</script>
<style>
  img{
    max-width: 100%
  }
</style>
<style lang="scss" scoped>
     img{
      max-width: 100%;
     }
@import '../../static/style/components/cpBlogContent.scss';

</style>
