<!-- 主页 -->
<template>
  <div class="indexContainer" :style="bgColor">
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
    'v-cpfooter':()=>import( '@/components/home/cpFooter')
  },
  computed: {
    ...mapGetters(['bgColor'])
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
