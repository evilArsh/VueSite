<template>
  <div id="listContainer" class="blogListContainer">
    <div class="blogCardContainer" v-for="item in blogList" :key="item.blog_id">
          <p class="type">#{{item.blog_type}}</p>
<router-link :to="{ path: '/blogContent/'+item.blog_id}" class="title">{{item.blog_title}}</router-link>

      <div class="contentContainer">
          <div class="describe">{{item.blog_describe}}</div>
 
        <img src="../../assets/homeBG.gif" alt="" class="img">


      </div>



      <div class="footerContainer">
        <a class="author">{{item.userNickName}}</a>
        <a class="time">{{item.blog_time}}</a>
        
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters,
  mapState 
} from 'vuex'
export default {
  props: {},
  data() {
    return {
      allDataDone:false,
      blogList:[]
    }
  },
  components: {},
  computed: {
    ...mapState({
      canGetBlog:state=>state.canGetBlog
    })
  },
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
  watch: {
    canGetBlog:function(){console.log('data, ...args')}
  },
  beforeMount() {},
  mounted() {
    // console.log(this)
    this.getBlogList(0,8);
  },
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpBlogMenu.scss';

</style>
