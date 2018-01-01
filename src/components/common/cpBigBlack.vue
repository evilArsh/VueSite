<!-- 黑幕布 -->
<template>
<div class="bigBlack" @click="hideNav"></div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {

    };
  },
  methods:{
  	...mapActions(["setNavVisible"]),
  	hideNav:function(){
  		this.setNavVisible(false);
  	}
  }
};
</script>

<style lang="scss" scoped>
.bigBlack{
	transition:all .3s ease;
	position: fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
	background-color: rgba(37,34,32,.9);
	z-index:100;
	//background-image: url(../assets/wall5.jpg);
	background-size: cover;
	background-repeat: no-repeat;
	background-position:center center;
}
</style>