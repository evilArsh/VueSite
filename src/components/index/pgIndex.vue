<!-- 主页 -->
<template>
  <div class="indexContainer">
    <socketdemo>/</socketdemo>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
    'socketdemo':()=>import('@/pages/soSocketTest')
  },
  computed: {
  },
  methods: {

  },
  watch: {
  },
  beforeMount() {

  },
  mounted() {
  },
  beforeUpdate() {}
}

</script>
<style lang="scss" scoped>
@import "../../static/style/components/pgIndex.scss";
</style>
