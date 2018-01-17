<template>
   <div>
     <vHeader></vHeader>
     <div v-if="load">加载中~~</div>
     <slot v-if="!load">
     <div  class="movie-show-top">
       <div  class="movie-bg" :style="{backgroundImage: 'url(' +movieMsg.images.small+ ')'}"></div>
       <div class="movie-bg-color"></div>
       <div class="movie-container">
         <div class="info-base">
           <div class="info-poster"><img :src='movieMsg.images.small'></div>
           <div class="info-detail">
             <h3>{{ movieMsg.title}}</h3>
             <p>导演：<span  v-for="(daoy,index) in movieMsg.directors" v-if="index==0">{{ daoy.name }}</span></p>
<!--
             <p>主演：<span v-for="(act,index) in movieMsg.casts" v-if="index<2">{{ act.name }} </span></p>
-->
             <p>类型：<span>{{ movieMsg.genres.join(' / ')}}</span></p>
             <p>上映日期：<span>{{ movieMsg.pubdate }} </span></p>
           </div>
         </div>
       </div>
     </div>
       <!--想看人数-->
       <div class="mv-count">
         <span>{{movieMsg.wish_count}}人想看</span><span>{{movieMsg.reviews_count}}人看过</span>
       </div>
       <!--影片简介-->
       <div class="about" @click="showMore2()" :class="{ moreline:moreline}">{{ movieMsg.summary }}</div>
       <!--演职人员-->
       <div class="action-list">
         <h3 class="title-h3">演职人员</h3>
         <div class="scroll-x-wrap">
           <ul class="scroll-x">
             <li v-for="(act,index) in movieMsg.casts">
               <figure>
                 <img :src="act.avatars.small"  alt="" referrerpolicy ="never">
                 <figcaption>{{act.name}}</figcaption>
               </figure>
             </li>
           </ul>
         </div>
       </div>
       <!--热门评论-->
       <div class="hot-commen">
         <h3 class="title-h3">热门评论</h3>
         <ul>
           <li v-for="(item,index) in list" v-if="index<9">
             <div class="user">
               <span><img :src="item.author.avatar" alt="" referrerpolicy ="never"></span>
               <p>{{item.author.name}}</p>
             </div>
             <div class="content">
               <p>
                 <em v-for="(items,index) in arrclass" class="rangebg" :class="items" v-if="index+1 == item.rating.value"></em> <span>{{item.created_at}} </span></p>
               <p @click="showMore(item)"  :class="{ moreline:item.moreline}">{{item.content}}</p>
             </div>
           </li>
         </ul>
       </div>
     </slot>
   </div>
</template>
<script>
  /*
  *
1、工作台行业资讯完成（资讯首页、资讯详情页与评论点赞）
2、UI提出的细节问题修改
3、登录注册开发中
  * */

  import vHeader from './base/header.vue'
  export default{
      data(){
          return{
              list:[],
              about:true,
              moreline:false,
             defaultimg:require('../assets/default_person.png'),

              load:true,
            arrclass:['range1','range2','range3','range4','range5'],
            movieMsg:{
                title:'',
              images:[],
              genres:[],
              casts:[],
              directors:[],
              year:'',
              summary:'',
              popular_comments: [
                  {
                  rating: {
                  max: '',
                  min: '',
                  value: ''
                },
                author: {
                  uid: '',
                  avatar: '',
                  name: ''
                },
                content: '',
                create_at: ''
              }],
              comments_count: '',
              popular_reviews: ''
            }
          }
      },
    components:  { vHeader },
    mounted:function(){
      this.$nextTick(function () {
         const id = 'https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=something&udid=dddddddddddddddddddddd'
          this.$http.jsonp(id)
            .then(function(reponse){
              console.log(reponse);
              this.movieMsg = reponse.data
              this.load = false
              reponse.data.popular_comments.forEach(item => {
                  this.$set(item,'moreline',false)
                  this.list.push(item);
              })
            })
            .catch(function(reponse){
              console.log(reponse);
            })
      })
    },

    methods:{
      showMore: function(ele) {
         ele.moreline = !ele.moreline
        },
      showMore2: function() {
         this.moreline = !this.moreline
        }

    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/styles/mvshow.scss";
.rangebg {
    margin-left: .133333rem;
    display: inline-block;
    height: 8px;
    background: url(../assets/star.png) 0 -87px no-repeat;
    background-size: 50px 104px;
    width: 58px;
  }
  .range1 {
    background-position: 0 -77px
  }
  .range2 {
    background-position: 0 -58px
  }
  .range3 {
    background-position: 0 -39px
  }
  .range4 {
    background-position: 0 -21px
  }
  .range5 {
    background-position: 0 -1px
  }

</style>

