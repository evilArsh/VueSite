<template >
  <div class="blogContainer">
    <v-cpblogmenu :menuData='getMenuData'></v-cpblogmenu>
    <div class="blogContent">
      
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import cpBlogMenu from '@/components/blog/cpBlogMenu' 
export default {
  data() {
    return {
    }
  },
  components: {
    'v-cpblogmenu':cpBlogMenu
  },
  computed: {
    getMenuData:function(){
      console.log(this.getBlogList())
      return this.getBlogList();
    }
  },
  methods: {
    ...mapActions(['fetchListData']),
    ...mapGetters(['getBlogList'])
  },
  watch:{
  },
  beforeMount() {

  },
  mounted() {
    this.fetchListData();
  },
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
</style>
