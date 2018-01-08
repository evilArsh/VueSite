import campusTime from '../pages/campusTime/pgCampusTime.vue' // 校园时光
import campusTimeHome from '../pages/campusTime/cpCampusHome.vue' // 校园时光-主页 
import campusTimeAlbum from '../pages/campusTime/cpAlbum.vue' // 校园时光-相册 
import campusTimeLive from '../pages/campusTime/cpLive.vue' // 校园时光-动态 
import campusTimeMessage from '../pages/campusTime/cpMessage.vue' // 校园时光-留言 
export default [{
  path: '/campusTime',
  name: '校园时光-首页',
  component: campusTime,
  meta: {
    isRoot: true,
    target:'campusTime'
  },
  children: [
      //把campusTimeHome并到campusTime中（未完成）
  /*{
      path: '/campusTime/',
      name: '校园时光-首页',
      component: campusTimeHome,
      meta: {
        isRoot: true,
      }
    },*/
    {
      path: 'album',
      name: '校园时光-相册',
      component: campusTimeAlbum,
      meta: {
        isRoot: false
      }
    },
    {
      path: 'message',
      name: '校园时光-留言',
      component: campusTimeMessage,
      meta: {
        isRoot: false
      }
    },
    {
      path: 'live',
      name: '校园时光-动态',
      component: campusTimeLive,
      meta: {
        isRoot: false
      }
    }
  ]
}]
