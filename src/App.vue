<template>
   <div id="app">
     <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"></router-view>
   </div>
</template>
<script>
  export default {
    data(){
      return {
        msg : 'hello vue'
      }
    }
  }
</script>
<style lang="scss">
  @import "./assets/styles/base.scss";
</style>

