<template>
    <transition
       v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:leave="leave"
  :css='false'
    >  
    <div class="footer normal" v-show="isFootShow">
      <p class="footerWord">Copyright © 2018 <a class="linkWord" href="http://www.miitbeian.gov.cn">黔ICP备17004129号</a></p>
    </div>
    </transition>
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
    ...mapGetters(['bgColor','isFootShow'])
  },
  methods: {
    beforeEnter:function(el){
      el.classList.remove("normal");
      el.classList.add("toggle");
    },
    enter:function(el,done){
      el.classList.remove("toggle");
      el.classList.add("normal");

    },
    leave:function(el,done){
      el.classList.remove("normal");
      el.classList.add("toggle");

    }
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
