<template>
  <div class="index-list">
    <vHeader></vHeader>
    <h1>{{ title }}</h1>
    <ul v-if="ok" class="movie-list">
      <li v-for="item in articles" @click="showMore(item.id)">
        <span><img :src=' item.images.large ' alt=""/></span>
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ typett }}: <span >{{ item.genres.join(' / ') }}</span></p>
        </div>
      </li>
    </ul>
    <div v-else>加载中~~</div>
  </div>
</template>

<script type="text/javascript">
  import vHeader from './base/header.vue'

  export default{
    data(){
      return {
        author: 'coco',
        title:'热门电影',
        articles: [],
        typett:'类型',
        ok:false
      }
    },
    mounted: function() {
      this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters', {}, {
        headers: {},
        emulateJSON: true
      }).then(function(response) {
        // 这里是处理正确的回调
        console.log(response);
        this.ok = true
        this.articles = response.data.subjects;
        // this.articles = response.data["subjects"] 也可以
      }, function(response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    },
    components:  { vHeader },
    methods:{
        showMore:function(str){
          this.$router.push({path: '/movie/' + str})
        }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/styles/index.scss";

</style>
