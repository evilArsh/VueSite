<!-- 主页 -->
<template>
  <div class="homeContainer">
    <a href="javascript:;" class="leftCtrl fa fa-chevron-left" @click="back"></a>
    <a href="javascript:;" class="rightCtrl fa fa-chevron-right" @click="next"></a>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    next: function() {
    },
    back: function() {
    	
    }
  },
  beforeMount() {

  },
  mounted() {
  },
  watch:{
  },
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import "../static/style/pages/pgHome.scss";

</style>
