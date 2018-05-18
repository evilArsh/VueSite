<template>
  <div class="editContainer" :style='bgColor'>
    <label for="bl1">
      <input class='title' id="bl1" placeholder="添加一个标题" type="text" v-model="title">
    </label>
    <label for="bl2">
      <input class='describe' id="bl2" placeholder="添加一些描述" type="text" v-model="describe">
    </label>
    <label for="bl3">
      <input class='describe' id="bl3" placeholder="添加自定义分类(如:生活，日记)" type="text" v-model="type">
    </label>
    <div ref="bar" class="bar"></div>
    <div ref="edit" class="edit">
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
      title: '',
      describe: '',
      content: '',
      imgData: [],
      type: '',
      edit: {}
    }
  },
  components: {},
  methods: {
    ...mapGetters(['getUserID', 'baseResourceURL']),
    ...mapActions(['setTipBarMsg', 'submitDataFromServer']),
    go: function() {
      // if (this.lock) return;
      this.lock = true;
      if (this.content.length === 0) {
        this.setTipBarMsg({ success: false, data: '您应该写点什么' });
        return;
      }
      this.imgData = this.extractImgData(this.edit.txt.getJSON());
      //将数组变成string 
      this.imgData=this.imgData.join(')(');
      this.content = this.delImgSrc(this.content);

      this.title.length===0?this.title='无标题文章':1;
      this.type.length===0?this.type='默认':1;
      this.title.describe===0?this.describe='暂无描述':1;
      this.upload();
    },
    //剔除文章里面的img标签src 的内容
    delImgSrc: function(html) {
      return html.replace(/src="[\S]*"/g, 'src=""');
    },
    //递归方式提取出文章内容中所有图片的src的值
    //data : edit.txt.getJSON()
    extractImgData: function(data) {
      let imgs = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].tag === 'img') {
          for (let j = 0; j < data[i].attrs.length; j++) {
            if (data[i].attrs[j].name === 'src') {
              data[i].attrs[j].value.length > 0 ? imgs.push(data[i].attrs[j].value) : 1;
              break;
            }
          }
        };
        if (typeof data[i].children === 'object' && data[i].children.length > 0) {
          imgs.push.apply(imgs, this.extractImgData(data[i].children));
        }
      }
      return imgs;
    },
    //以后修改或者拓展
    upload: function() {
      let _ = this;
      this.$ajax.createBlog_WangEditor(this.getUserID(), {
        title: this.title,
        describe: this.describe,
        content: this.content,
        type: this.type,
        img:this.imgData
      }).then(function(res) {
        _.lock = false;
        _.submitDataFromServer(res.data);
        _.$router.push({ path: '/blogMenu' });
      })
    }
  },
  mounted() {
    const edit = new E(this.$refs.bar, this.$refs.edit);
    edit.customConfig.showLinkImg = false;
    edit.customConfig.uploadImgShowBase64 = true;


    edit.customConfig.pasteIgnoreImg = true
    edit.customConfig.onchange = (html) => {
      this.content = html;
    };
    edit.create();

    this.edit = edit;
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
