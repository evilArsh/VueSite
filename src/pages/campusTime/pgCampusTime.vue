<template>
  <div class="campusTime" :style="bgColor">
      <campus-time-nav></campus-time-nav>
      <div class="content">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
      </div>
      <footer></footer>
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import PGcampusTimeNav from './pgCampusTimeNav' // 导航组件
import PGcampusTimeHome from './pgCampusTimeHome' // 展示个人的动态
export default {
  data () {
      return {
          router: [
              {
                  path: '/home'
              },
              {
                  path: '/message'
              }
          ]
      }
  },
  computed:{
    ...mapGetters(['bgColor'])
  },
  components: {
      'campus-time-nav': PGcampusTimeNav, // 导航组件
  }


}
</script>
<style lang="scss" scoped>
@import "../../static/style/campusTime/campusTime.scss"
</style>

