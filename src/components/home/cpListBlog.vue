<template >
  <div class="listBlogContainer">
    
    <div v-for="(item,index) in datas" :key="index">
      <p class="aTitle">{{item.title}}</p>
      <div class="aContent">{{item.content}}</div>
      <div class="aFooter">
          <span class="aTime">{{item.time}}</span>
          <a href="#" class="aEnter">进入博客</a>
      </div>
    </div>
  
  </div>
</template>
<script>
export default {
  props:{
    datas:Array
  },
  data() {
    return {
    }
  }
}

</script>
<style lang="scss" scoped>
 //@import "../static/style/components/cpListBlog.scss";
</style>
