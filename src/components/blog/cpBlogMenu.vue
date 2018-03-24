<template>
  <div class="blogListContainer">
    <div class="search">
      <span class="tip fa fa-search"></span>
      <input type="text" class="input">
    </div>
    <div @click="toggleMain($event)">
      <ul>
        <li class="block" v-for="(item_block,index_block) in menuData" :key="index_block" :id="'first'+index_block">
          <div class="title_outer">
            <span class="title">{{item_block.head.title}}</span>
            <span class="ttip fa fa-caret-left" :id="'tip_first'+index_block"></span>
          </div>
          <ul class="default">
            <li class="item" v-for="(item_time,index_time) in item_block.data" :key="index_time" :id="'first'+index_block+'second'+index_time">
              <div class="date_outer">
                <span class="ttip_l fa fa-caret-right" :id="'tip_first'+index_block+'second'+index_time"></span>
                <span class="date">{{item_time.head.date}}</span>
              </div>
              <ul class="default">
                <li class="item_content" v-for="(item_c,index_c) in item_time.data" :key="index_c" :id="'first'+index_block+'second'+index_time+'third'+index_c">{{item_c.title}}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  props: {
    //列表数据
    menuData: {}
  },
  data() {
    return {
      target: {},
      defSSS: 28,
      defSS: 23
    }
  },
  components: {},
  computed: {},
  methods: {
    //列表点击主事件
    toggleMain: function(evt) {
      if (evt && evt.target) {
        evt.target.nodeName == "DIV" ? this.toggleBar(evt.target) : this.judgeTarget(evt.target);
      }
    },
    toggleBar: function(target) {
      let id = target.parentNode.getAttribute('id');
      let index = id.match(/\d+/g);
      let level = id.match(/\D+/g).length;
      let combo = this.indexCombo(index);
      //have initiated
      if (this.target[combo] !== undefined) {
        let height = (window.getComputedStyle(target.nextElementSibling, '').height).match(/\d+/g)[0];
        //will close
        if (this.target[combo].isOpen) {
          //如是递归组件,此处可拓展,目标树结点高度的改变影响父组件
          if (level > 1) {
            this.target[index[0]].height -= height;
            this.target[index[0]].extra = this.target[index[0]].height;
          };
          this.target[combo].extra = this.target[combo].height;
          this.target[combo].height = 0;
          //will open
        } else {
          if (level > 1) {
            this.target[index[0]].height += this.target[combo].extra;
          };
          this.target[combo].height = this.target[combo].extra;
        }
      } else { /*初始化*/
        this.target[combo] = {};
        this.target[combo].isOpen = false;
        if (level > 1) {
          this.target[combo].extra = this.target[combo].height = (this.menuData[index[0]].data[index[1]].data.length) *
            this.defSS;
          this.target[index[0]].height += this.target[combo].height;
          console.log(this.target[combo].height)
          console.log(this.target[index[0]].height)
        } else {
          this.target[combo].extra = this.target[combo].height = (this.menuData[combo].data.length) * this.defSSS;
        }
      }
      if (level > 1) {
        document.getElementById(id).parentNode.style.height = this.target[index[0]].height + 'px';
      }
      target.nextElementSibling.style.height = this.target[combo].height + 'px';
      this.tipRotate(id, this.target[combo].isOpen);
      this.target[combo].isOpen = !this.target[combo].isOpen;
    },
    judgeTarget: function(target) {
      while (target.nodeName !== "DIV" && target.nodeName !== "LI" && target.nodeName !== "BODY") {
        target = target.parentNode;
      }
      target.nodeName === "DIV" ? this.toggleBar(target) : /*打开文章*/ 1;
    },
    //旋转小图标
    tipRotate: function(id_, isOpen) {
      let pre = "tip_",
        id = pre.concat(id_),
        el = document.getElementById(id);
      console.log(el.className)
      let cls = el.className.match(/^(.(?!(rDefault|rDown)))+/g);
      //will close
      if (isOpen) {
        cls.push('rDefault');
      } else {
        cls.push('rDown');
      }
      cls = cls.join(' ');
      el.className = cls;
    },
    //索引合并
    indexCombo: function(data) {
      var s = '';
      for (let i = 0; i < data.length; i++) {
        s += data[i]
      }
      return s;
    }
  },
  watch: {
    'menuData' (news) {}
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpBlogMenu.scss';
.default {
  overflow: hidden;
  transition: all 0.3s ease;
  display: blcok;
  height: 0;
}

.fa {
  transition: all 0.3s ease;
}

</style>
