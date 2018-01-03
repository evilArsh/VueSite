<!-- 底部加载动画 -->
<template>
<div class="loadFoot">
    <p>{{showWhat}}</p>
</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    props:{
        target:Boolean
    },
  data () {
    return {
        option:['加载中...','没有更多了']
    };
  },
  computed:{
    showWhat:function(){
        return this.target===false?this.option[0]:this.option[1];
    }
  },
  mounted(){
  },
  methods:{
    }
  }
</script>

<style lang="scss" scoped>
.loadFoot{
    background-color:#00cee5;
    p{
        padding:10px 0;
        text-align:center
    }
}
</style>