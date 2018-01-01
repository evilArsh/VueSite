<template>
  <div class="campusTimeNav">
      <nav>
          <ul>
              <li v-for="(item,index) in navList" :key="item.id" v-on:click="showId(index)">
                  <router-link :to="item.url">
                      <div class="titleImg">
                            <div class="nav_left">
                                <img :src="item.img" :alt="item.index">
                            </div>
                            <div class="nav_right">
                                {{ item.title }}
                            </div>
                            <div class="clearFloat"></div>
                        </div>
                    </router-link>
                </li>
          </ul>
      </nav>
  </div>
</template>
<script>
export default {
  data () {
      return {
          navList: [
              {
            "title": "主页",
            "url": "/campusTime/home",
            "img": "../../../../static/img/addressbook.svg"
        },
        {
            "title": "动态",
            "url": "/campusTime/message",
            "img": "../../../../static/img/message.svg"
        },
        {
            "title": "相册",
            "url": "/campusTime/album",
            "img": "../../../../static/img/picture.svg"
        },
        {
            "title": "留言",
            "url": "/campusTime/message",
            "img": "../../../../static/img/createtask.svg"
        }
          ]
      }
  },
  methods: {
      showId (index) {
        //   console.log("显示当前ID："+index);
      }
  }
}
</script>
<style scoped>
@import "../../static/style/campusTime/campusTimeNav.scss";
</style>
