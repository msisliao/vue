<template>
    <header><a @click="backLastPage">←</a>豆瓣电影  <i @click="searchPage" class="search-icon"></i></header>
</template>
<script>
  export default {
      data(){
          return{

          }
      },

    methods:{
      backLastPage:function(){
        window.history.go(-1)
      },
      searchPage:function(){
        this.$router.push({path:'/MsearshPage'})
      }
    }
  }
</script>

