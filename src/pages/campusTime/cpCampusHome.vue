<template>
  <div class="home">
    <a v-on:click="showData"> 单机 </a>
      <ul>
        <li v-for="item in campusTimeHomeData" :key="item.id">{{ item.title }}</li>
      </ul>
  </div>
</template>
<script>
export default {
  data () {
      return {
        campusTimeHomeData: {}
      }
  },
  munted () {
    this.getData();
  },
  methods: {
    createxmlHttpRequest () {
      if (window.ActiveXObject) {  
        return new ActiveXObject("Microsoft.XMLHTTP");  
      } else if (window.XMLHttpRequest) {  
        return new XMLHttpRequest();  
      } 
    },
    ajax () {
      var ajaxData = {
        type: arguments[0].type || "GET",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "json",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend: arguments[0].beforeSend || function(){}, 
        success: arguments[0].success || function(){}, 
        error: arguments[0].error || function(){} 
    }
      ajaxData.beforeSend()
      var xhr = this.createxmlHttpRequest(); 
      xhr.responseType=ajaxData.dataType;
      xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);
      xhr.setRequestHeader("Content-Type",ajaxData.contentType);  
      xhr.send(this.convertData(ajaxData.data));
      xhr.onreadystatechange = function() {  
        if (xhr.readyState == 4) {  
          if(xhr.status == 200){ 
            ajaxData.success(xhr.response) 
          }else{ 
            ajaxData.error() 
          }
        }
      }
  },
    convertData (data) {
  if( typeof data === 'object' ){ 
    var convertResult = "" ;  
    for(var c in data){  
      convertResult+= c + "=" + data[c] + "&";  
    }  
    convertResult=convertResult.substring(0,convertResult.length-1) 
    return convertResult; 
  }else{ 
    return data; 
  } 
},
    getData () {
      const $this = this;
      new Promise(function(resolve,reject){
        $this.ajax({
          url: "https://cnodejs.org/api/v1/topics",
          success: function(msg){
            resolve(msg.data);
          },
          error: function(){
            reject("ERROR");
          }
        })
      }).then( (msg)=>{$this.campusTimeHomeData=msg;}, (err)=>{$this.campusTimeHomeData=err;});

    },
    showData () {
      console.log(this.campusTimeHomeData)
    }
  }
}
</script>
<style lang="scss" scope>

</style>
