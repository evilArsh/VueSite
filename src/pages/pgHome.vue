<!-- 主页 -->
<template >
  <div class="homeContainer">
    <v-cpListBlog :datas='blogData'></v-cpListBlog>
    <v-cpLoadFoot :target="lockEvent"></v-cpLoadFoot>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import cpListBlog from '@/components/home/cpListBlog'
import cpLoadFoot from '@/components/common/cpLoadFoot'
export default {
  data() {
    return {
      //无数据了就无需获取    |获取数据时关闭获取数据功能
      lockEvent:this.isAll()
    }
  },
  components: {
    'v-cpListBlog':cpListBlog,
    'v-cpLoadFoot':cpLoadFoot
  },
  computed: {
    blogData:function(){
      return this.getData();
    }
  },
  methods: {
    ...mapGetters(['getData','isAll']),
    ...mapActions(['fetchData']),
    //滚动条滑到一定位置触发获取数据
    loadData:function(event){
      if(!this.lockEvent){
        if(document.documentElement.scrollTop+document.body.scrollTop>this.$el.offsetHeight/2){
        };
    }
  }
  },
  watch:{
  },
  beforeMount() {

  },
  mounted() {
    this.fetchData();
    document.addEventListener('scroll',this.loadData);
  },
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import "../static/style/pages/pgHome.scss";

</style>
