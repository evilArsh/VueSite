<template >
  <div class="blogListContainer">
    <div class="search"><span class="tip fa fa-search"></span><input type="text" class="input"></div>
    <div  @click="toggleMain($event)">
   <ul>
   <li class="block" v-for="(item_block,index_block) in menuData" :key="index_block" :id="'first'+index_block">

      <div class="title_outer"><span class="title">{{item_block.head.title}}</span><span class="title_tip fa fa-caret-down"></span></div>
      <ul class="default">
       <li class="item" v-for="(item_time,index_time) in item_block.data" :key="index_time" :id="'first'+index_block+'second'+index_time">

        <div class="date_outer"><span class="date fa fa-caret-down">{{item_time.head.date}}</span>
          </div>
          <ul class="default d">
           <li class="item_content"  v-for="(item_c,index_c) in item_time.data" :key="index_c" :id="'first'+index_block+'second'+index_time+'third'+index_c">{{item_c.title}}</li>
         </ul>
       </li>
     </ul>
   </li>
 </ul>
 </div>
  </div>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props:{
    //列表数据
    menuData:{}
  },
  data() {
    return {
      target:{},
      defSSS:28,
      defSS:23
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    //列表点击主事件
    toggleMain:function (evt) {
      //console.log(evt)
      if(evt&&evt.target){
        evt.target.nodeName=="DIV"?this.toggleBar(evt.target):this.judgeTarget(evt.target);
      }
    },
    toggleBar:function(target){
      let id=target.parentNode.getAttribute('id');
      let index=id.match(/\d+/g);
      let level=id.match(/\D+/g).length;
      let combo=this.indexCombo(index);
      console.log('level:'+level)
      console.log('this.target[combo]!==undefined:'+(this.target[combo]!==undefined))
      //console.log('this.target[combo]:'+this.target[combo])
      if(this.target[combo]!==undefined){
          if(this.target[combo].isOpen){
          let height=(window.getComputedStyle(target.nextElementSibling,'').height).match(/\d+/g)[0];
          if(level>1){
            this.target[index[0]][height]-=this.target[index[0]][height]-height;
          }
         // this.target[combo][isOpen]=false;
        }
      }else{
        this.target[combo]={};
        this.target[combo].isOpen=false;
        if(level>1){
        this.target[combo].height=(this.menuData[index[0]].data[index[1]].data.length)*this.defSS;
        this.target[index[0]].height+=this.target[combo].height;
        console.log(this.target[combo].height)
        console.log(this.target[index[0]].height)
        }else{
        this.target[combo].height=(this.menuData[combo].data.length)*this.defSSS;
        }
      }
      //执行toggle
      if(this.target[combo].isOpen){
        target.nextElementSibling.style.height='0px';
      }else{
        //console.log(this.target[combo].height)
        target.nextElementSibling.style.height=this.target[combo].height+'px';
      }
        this.target[combo].isOpen=!this.target[combo].isOpen;
      //let height=window.getComputedStyle(target.nextElementSibling,'').height;
      //console.log(window.getComputedStyle(target.nextElementSibling,'').height)
      //console.log(target.parentNode.getAttribute('id').match(/^\D+/g));
      //target=target.nextElementSibling;
      },
    judgeTarget:function(target){
      while(target.nodeName!=="DIV"&&target.nodeName!=="LI"&&target.nodeName!=="BODY"){
        target=target.parentNode;
      }
      target.nodeName==="DIV"?this.toggleBar(target):/*打开文章*/1;
    },
    //索引合并
    indexCombo:function(data){
      var s='';
      for(let i=0;i<data.length;i++){
        s+=data[i]
      }
      return s;
      //console.log(s);
    }
  },
  watch:{
    'menuData'(news){
      //console.log(news.length)
    }
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpBlogMenu.scss';
.default{
  overflow:hidden;
  transition:all 0.3s ease;
  display:blcok;
  height:0;
}
.d{height:500px}
</style>

