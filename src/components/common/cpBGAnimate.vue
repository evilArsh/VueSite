<!-- 背景运动动画  -->
<template>
  <div class="bgContainer" id="note">
    <canvas id="cvs"></canvas>
  </div>
</template>
<script>
import tween from '../../static/util/tween'
import imgUrl from '../../assets/note1.gif'//待修改,设置调用方法get image
export default {
  data() {
    return {
      Tween: '',
      //canvas
      cvs: Object,
      //context 2d
      ctx: Object,
      //图片元数据
      //set it with array type to be flexable
      img: {
        self: Object,
        iWidth: '',
        iHeight: ''
      },
      //canvas和窗口大小
      width: '',
      height: '',
      imgNum: 6,
      //每个图片的运动参数
      imgData: [],
      //运动类型
      runTypes: [],
      //运动规则,待优化
      runRules: ['easeIn', 'easeOut', 'easeInOut'],
      animateSwitch: null,
      //
      loopHandle:null,
    };
  },
  mounted() {
  	let _self=this;
    window.onresize = this.updateScale;
    window.requestAnimationFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||window.msRequestAnimationFrame||function(callback) {
          window.setTimeout(callback, 17);
        }
    })();
    window.cancelAnimationFrame=(function(){
    	return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    })
    this.Tween = tween;
    //装载Tween动画名字
    this.runTypes = Object.assign([], JSON.stringify(this.Tween).match(/\b\w+\b/g), this.runType);
    /*******************************/
    this.init();
  },
  computed: {

  },
  methods: {
    resetPosition(imgObj, isOverFlow, curX, curY) {
      imgObj.curTime = 0;
      imgObj.runType = this.randomType();
      imgObj.runRule = this.randomRule();
      if (isOverFlow) {
        imgObj.curTime = 0;
        imgObj.endX = curX>this.width/2?0:this.width;
        imgObj.initX =curX>this.width/2?this.width:0;//curX>this.width?this.width:curX<this.width?0:curX;
        imgObj.endY = curY>this.height/2?0:this.height;
        imgObj.initY = curY>this.height/2?this.height:0;//curY>this.height?this.height:curY<this.Height?0:curY;
        return;
      }
      imgObj.endX = imgObj.endX + imgObj.initX;
      imgObj.initX = imgObj.endX - imgObj.initX;
      imgObj.endX = imgObj.endX - imgObj.initX;
      imgObj.endY = imgObj.endY + imgObj.initY;
      imgObj.initY = imgObj.endY - imgObj.initY;
      imgObj.endY = imgObj.endY - imgObj.initY;
      return;
    },
    randomType: function() {
      let r = Math.random,
        types = this.runTypes;
      return {
        x: types[parseInt((types.length - 1) * r())],
        y: types[parseInt((types.length - 1) * r())]
      };
    },
    randomRule: function() {
      let r = Math.random,
        rules = this.runRules;
      return {
        x: rules[parseInt((rules.length - 1) * r())],
        y: rules[parseInt((rules.length - 1) * r())]
      };
    },
    closeAnimate:function(){
    	this.animateSwitch=false;
    },
    startAnimate:function(){
    	this.animateSwitch=true;
    },
    updateScale: function() {
      this.closeAnimate();
      this.width = document.body.clientWidth;
      this.height = document.body.clientHeight;
      this.startAnimate();
    },
    init: function() {
      let _self = this;
      this.cvs = document.getElementById('cvs');
      this.ctx = this.cvs.getContext('2d');
      this.updateScale();
      //创建图片
      this.img.self = new Image();
      this.img.iWidth = 20,
        this.img.iHeight = 20,
        this.img.self.src = imgUrl;
      //
      this.img.self.onload = function() {
        this.runConfig();
        this.startAnimate();
      }.bind(this);
    },
    //配置运动的参数
    runConfig: function() {
      let xP = this.width,
        yP = this.height;
      for (let n = 0; n < this.imgNum; n++) {
        let x = Math.floor(Math.random() * this.width),
          y = Math.floor(Math.random() * this.height),
          rT = this.randomType(),
          rR = this.randomRule();
        this.imgData.push({
          //动态位置 ---del
          xPos: x,
          yPos: y,
          //初始位置
          initX: x,
          initY: y,
          //终止位置
          endX: x > xP / 2 ? 0 : xP,
          endY: y > yP / 2 ? 0 : yP,
          //总共持续多久
          duration: 5000,
          //已经持续了多久(动态增加)
          curTime: 0,
          //步长
          step: 3,
          //运动类型
          runType: rT,
          //运动规则
          runRule: rR
        });
      }
    },
    //画图循环
    drawLoop: function() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (let n = 0; n < this.imgData.length; n++) {
        let tmp = this.imgData[n],
          type = this.runType;
        //如果没运动完
        if (tmp.curTime <= tmp.duration) {
          // eval('this.Tween'+tmp.runType+tmp.runRule)
          let curX = Math.floor(this.Tween[tmp.runType.x][tmp.runRule.x](tmp.curTime, tmp.initX, tmp.endX - tmp.initX, tmp.duration)),
            curY = Math.floor(this.Tween[tmp.runType.y][tmp.runRule.y](tmp.curTime, tmp.initY, tmp.endY - tmp.initY, tmp.duration));
          //超出范围复位，有可能没运动完一个周期
          if (curX * curY < 0 || curY > this.height || curX > this.width) {
            this.resetPosition(tmp, true, curX, curY);
            
          } 
            tmp.curTime+=5;
            this.ctx.drawImage(this.img.self, curX, curY, this.img.iWidth, this.img.iHeight);
          
        }
        //运动完了就复位，curTime归零，初始位置和结束位置调换,换运动类型--del
        else {
          //时间用完复位
          this.resetPosition(tmp, false);
        }
      }
      this.loopHandle=window.requestAnimationFrame(this.drawLoop);
    }
  },
  watch: {
    //当改变窗口大小的时候canvas大小随之改变
    width: function(val) {
      this.cvs.width = val;
    },
    height: function(val) {
      this.cvs.height = val;
    },
    animateSwitch:function(val){
    	if(val===true){
    		this.loopHandle?window.cancelAnimationFrame(this.loopHandle):true;
    		this.ctx.clearRect(0, 0, this.width, this.height);
    		this.drawLoop();
    	}else{
    		window.cancelAnimationFrame(this.loopHandle);
    		this.ctx.clearRect(0, 0, this.width, this.height);
    	}
    },
    imgNum: function(val) {

    }
  }
};

</script>
<style lang="scss" scoped>
.bgContainer {}

#cvs {
  top: 0;
  bottom: 0;
  z-index:-1;
  position: absolute;
  overflow: hidden;
}

</style>
