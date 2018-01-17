<template>
  <div class="search-wrap">
   <div class="searsh-top"> <input type="" placeholder="请输入影片名" v-model="keyword" @keyup="getList"/> <span @click="back">取消</span></div>
    <div>
      <h3>{{titleH3}}</h3>
      <ul class="hotlist" v-if="hotMovie">
        <li v-for="item in hotSearch" @click="search(item.id)">{{ item.name}}</li>
      </ul>
    </div>


    <ul  class="result-list" v-if="!hotMovie">
        <li v-for="(item, index) in search_result.subjects" @click="search(item.id)">{{ item.title }}</li>
      </ul>


  </div>
</template>
<script>
  export default{
      data(){
          return{
            hotMovie:true,
            titleH3:'热门搜索',
            keyword:'',

            hotSearch:[
              {name:'寻梦环游记',id:'20495023'},
              {name:'金珠玛米',id:'27063332'},
              {name:'帕丁顿熊2',id:'26340419'},
              {name:'至爱梵高·星空之谜',id:'25837262'},
              {name:'巨额来电',id:'26985857'},
            ],
            search_result:{

            },
          }
      },
    methods: {
      back: function () {
        window.history.go(-1)
      },
      created: function () {
        this.getList()
      },
      watch: {
        $route: 'getList'
      },
      getList: function () {
        this.val = this.keyword
        const serchUrl = 'https://api.douban.com/v2/movie/search?q=' + this.val
        this.$http.jsonp(serchUrl)
          .then(function (response) {
            this.search_result = response.body
          })
          .catch(function (response) {
          })
// 输入的内容为空时 显示热门搜索

        this.val === '' ? this.hotMovie = true : this.hotMovie = false
      },
      search: function (str) {
        this.$router.push({path: '/movie/' + str})
      },
    }
    }

</script>
<style lang="scss" scoped="">
  .searsh-top{ border-bottom:1px solid #ddd; position:relative; display:flex; padding:6px 15px; padding-right:0;background-color:#219e67;color:#fff;align-items:center;
   input{flex:1;border:1px solid #eee; border-radius:3px;padding:8px 5px; font-size:12px;outline:0;}
    span{width:50px; text-align:center;}
  }
  .search-wrap{
   h3{ padding-left:15px;}
    ul.hotlist{padding:0 15px;
      li{color:#666; line-height:1.8; margin-bottom:15px; border:1px solid #eee;padding:2px 15px; display:inline-block; border-radius:15px; margin-right:10px;}
    }
.result-list{
  padding:0 15px; padding-right:0;
  li{ border-bottom:1px solid #eee;padding:10px 0;color:#666;}
}
  }
</style>
