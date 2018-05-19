<template>
  <div id="listContainer" class="blogListContainer">
    <div class="blogCardContainer" v-for="item in blogList" :key="item.blog_id">
      <p class="type">#{{item.blog_type}}</p>
      <router-link :to="{ path: '/blogContent/'+item.blog_id}" class="title">{{item.blog_title}}</router-link>
      <div class="contentContainer">
        <div class="describe">{{item.blog_describe}}</div>
        <img v-for="img in item.blog_img" :src="img" alt="" class="img">
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
  name: 'blogMenu',
  data() {
    return {
      //拉到最低端
      maxBottom: -Infinity,
      //如果滚轮上滑，不触发
      old: 1,
      news: 0,
      allDataDone: false,
      blogList: [],
      queryAfter: 0,
      number: 8,
      //保证低速网络下不重复请求
      getSignal: true
    }
  },
  components: {},
  computed: {},
  methods: {
    ...mapActions(['setBlogList', 'toggleHomeFixed','toggleWait']),
    scroll: function(e) {
      if (this.allDataDone === true) {
        return;
      }
      let scale = document.querySelector('#listContainer').getBoundingClientRect();
      this.news = this.old;
      this.old = -(scale.bottom);
      if (this.news < this.old) {
        if (document.body.clientHeight / scale.bottom >= 0.8 && this.maxBottom < -(scale.bottom)) {
          this.getBlogList(this.queryAfter, this.number);
        }
        this.maxBottom < -(scale.bottom) ? this.maxBottom = -(scale.bottom) : 1;
      }
    },
    reset: function() {},
    getBlogList: function(queryAfter, number) {
      const _ = this;
      if (!this.getSignal) {
        return;
      }
      this.toggleWait(true);
      this.getSignal = false;
      this.$ajax.getBlogList(queryAfter, number).then(function(res) {
        _.setBlogList(res.data);
        _.getSignal = true;
        if (res.data.success) {
          if (res.data.package.length === 0) { _.allDataDone = true; }
          // console.log(res.data.package)
          _.queryAfter += number;
          _.pushData(res.data.package);
        }
        _.toggleWait(false);
        
      });
    },
    pushData: function(data) {
      for (let i = 0; i < data.length; i++) {
        data[i].blog_img = this.changeToArry(data[i].blog_img)
        this.blogList.push(data[i]);
      }
    },
    changeToArry: function(imgStr) {
      if (!imgStr) return [];
      return imgStr.split(')(');
    }
  },
  watch: {},
  beforeCreate(){
    // this.toggleWait(true);
  },
  mounted() {
    document.body.onscroll = this.scroll;
    window.onresize = this.reset;
    this.getBlogList(this.queryAfter, this.number);
  },
  activated() {
    this.toggleHomeFixed(false);
  },
  deactivated() {
    this.toggleHomeFixed(true);
  },
  beforeDestroy() {
    this.toggleHomeFixed(true);
    document.body.onscroll = function() {};
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpBlogMenu.scss';

</style>
