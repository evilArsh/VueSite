<template>
  <div class="headContainer" :style="bgColor">
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
