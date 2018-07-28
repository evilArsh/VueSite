<template>
    <div class="footer normal">
      <p class="footerWord">Copyright © 2018 <a class="linkWord" href="http://www.miitbeian.gov.cn">黔ICP备17004129号</a></p>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
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
@import '../../static/style/components/cpFooter.scss';
</style>
