<template>
  <div class="editContainer" :style='bgColor'>
    <input class='title' placeholder="无标题文章" type="text">
    <input class='describe' placeholder="无描述" type="text" >
    <div  ref="bar" class="bar"></div>
      <div ref="edit" class="edit">
        <p>请输入内容</p>
      </div>
      <div class="handle"></div>
  </div>
</template>
<script>
import E from 'wangeditor'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
      title:'无标题文章',
      describe:'',
      content:''
    }
  },
  components: {
  },
  methods: {
    // beforeEnter:function(el){
    //   el.classList.remove("normal");
    //   el.classList.add("toggle");
    // },
    // enter:function(el,done){
    //   el.classList.remove("toggle");
    //   el.classList.add("normal");

    // },
    // leave:function(el,done){
    //   el.classList.remove("normal");
    //   el.classList.add("toggle");

    // }
  },
  mounted() {
           var edit = new E(this.$refs.bar,this.$refs.edit)
        edit.customConfig.onchange = (html) => {
          this.content = html
        }
        edit.create()
  },
  computed: {
    ...mapGetters(['bgColor'])
  },
  watch: {
    
  }
}

</script>
<style lang="scss" scoped>

@import '../../static/style/components/cpBlogEdit.scss';

</style>
