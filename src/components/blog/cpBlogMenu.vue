<template>
  <div class="blogListContainer">
    <div class="blogCardContainer">
      
    </div>
    <div class="blogCardContainer" v-for="item in blogList" :key="item.blog_id">
      <div class="contentContainer">
        <div>
          <p class="type">#{{item.blog_type}}</p>
        </div>
        <img src="../../assets/logo.png" alt="" class="img">
        <div class="content">
          <p class="title">{{item.blog_title}}</p>
          <p class="describe">{{item.blog_descbibe}}</p>
        </div>
      </div>
      <div class="footerContainer">
        <a class="author">{{item.userNickName}}</a>
        <a class="time">{{item.blog_time}}</a>
        <router-link :to="{ path: '/blogContent/'+item.blog_id}" class="enter">查看</router-link>
      </div>
    </div>
    <div class="handle">
     <!--  <a href="javascript:;" class="prev">上一页</a>
      <a href="javascript:;" class="next">下一页</a> -->
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  props: {},
  data() {
    return {
      blogList:[]
    }
  },
  components: {},
  computed: {},
  methods: {
     ...mapActions(['setBlogList']),
    getBlogList:function(queryAfter,number){
      const  _=this;
      this.$ajax.getBlogList(queryAfter,number).then(function(res){
        _.setBlogList(res.data);
        if(res.data.success){
          _.pushData(res.data.package);
        }
      });
    },
    pushData:function(data){
      for(let i=0;i<data.length;i++){
        this.blogList.push(data[i]);
      }
    }
  },
  watch: {},
  beforeMount() {},
  mounted() {
    this.getBlogList(0,8);
  },
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpBlogMenu.scss';

</style>
