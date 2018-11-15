<!-- 主页 -->
<template>
  <div class="indexContainer">
    <v-socketdemo>/</v-socketdemo>
    <v-cpfooter></v-cpfooter>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
    'v-socketdemo':()=>import('@/pages/soSocketTest'),
    'v-cpfooter':()=>import( '@/components/home/cpFooter')
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
@import "../static/style/pages/pgHome.scss";
</style>
