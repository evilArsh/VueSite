<template >
  <div class="">
   <div v-for="(item_block,index_block) in menuData" :key="index_block">
    <span>{{item_block.head.title}}</span><span>{{item_block.head.number}}</span>
     <div v-for="(item_time,index_time) in item_block.data" :key="index_time">
      <span>{{item_time.head.date}}</span><span>{{item_time.head.number}}</span>
       <ul>
         <li v-for="(item_c,index_c) in item_time.data" :key="index_c">{{item_c.title}}</li>
       </ul>
     </div>
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
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
  },
  watch:{
  },
  beforeMount() {

  },
  mounted() {
  },
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
</style>

