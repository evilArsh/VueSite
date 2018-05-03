<template>
  <div class="headContainer" :style="bgColor">
    <!-- 用户 -->
    <div class="user"></div>
    <!-- 链接 -->
    <div class="link">
      <a href="javascript:;" class="linkItem fa fa-github"></a>
      <a href="javascript:;" class="linkItem fa fa-weibo"></a>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {
      tipDirection:true,
    }
  },
  components: {
  },
  methods: {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(["bgColor"]),
  },
  watch: {
  }
}

</script>
<style lang="scss" scoped>
@import '../../static/style/components/cpHeader.scss';

</style>
