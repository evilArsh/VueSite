<template>
  <div class="editContainer" :style='bgColor'>
    <label for="bl1">
    <input class='title' id="bl1"  placeholder="添加标题" type="text" v-model="title">
      
    </label>
    <label for="bl2">
    <input class='describe' id="bl2" placeholder="添加一些描述" type="text" v-model="describe">
      
    </label>
    <label for="bl3">
    <input class='describe' id="bl3" placeholder="添加分类" type="text" v-model="type">
      
    </label>
    <div ref="bar" class="bar"></div>
    <div ref="edit" class="edit">
      <p>请输入内容</p>
    </div>
    <div class="handle">
      <button class="go" @click="go">发布</button>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
      lock: false,
      title: '无标题文章',
      describe: '无描述',
      content: '',
      type: '未分类'
    }
  },
  components: {},
  methods: {
    ...mapGetters(['getUserID']),
    ...mapActions(['setTipBarMsg', 'submitDataFromServer']),
    go: function() {
      if (this.lock) return;
      this.lock = true;
      if (this.content.length === 0) {
        this.setTipBarMsg({ success: false, data: '您应该写点什么' });
        return;
      }
      let _ = this;
      console.log(this.getUserID())
      this.$ajax.createBlog(this.getUserID(), {
        title: _.title,
        describe: _.describe,
        content: _.content,
        type: _.type
      }).then(function(res) {
        _.lock=false;
        _.submitDataFromServer(res.data);
         _.$router.push({path:'/blogMenu'});
      })
    }
  },
  mounted() {
    var edit = new E(this.$refs.bar, this.$refs.edit)
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
