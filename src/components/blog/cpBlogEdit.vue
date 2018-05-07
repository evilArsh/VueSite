<template>
  <div class="editContainer" :style='bgColor'>
    <input class='title' placeholder="添加标题" type="text" v-model="title">
    <input class='describe' placeholder="添加一些描述" type="text" v-model="describe">
    <input class='describe' placeholder="添加分类" type="text" v-model="type">
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
      title: '无标题文章',
      describe: '无描述',
      content: '',
      type: '未分类'
    }
  },
  components: {},
  methods: {
    ...mapGetters(['getUserID']),
    ...mapActions([ 'setTipBarMsg','submitDataFromServer']),
    go: function() {
      if (this.content.length === 0) {
        this.setTipBarMsg({ success: false, data: '您应该写点什么' });
        return;
      }
      let _ = this;
      console.log(this.getUserID())
      this.$ajax.createBlog(this.getUserID(), {
        title:_.title,
        describe:_.describe,
        content:_.content,
        type:_.type
      }).then(function(res){
        _.submitDataFromServer(res.data)
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
