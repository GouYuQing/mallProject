<template>
    <div>
        <!-- 导航搜索 -->
       <div class="search-bar">
           <van-row>
               <van-col span="3">
                   <img :src="locationIcon" width="65%" class="location-icon"/>
               </van-col>
                <van-col span="16">
                    <input type="text" class="search-input"/>
                </van-col>
                <van-col span="5">
                    <van-button size="small" type="warning">搜索</van-button>
                </van-col>
           </van-row>
       </div>
       <!-- 轮播图 -->
       <div class="swiper-area">
           <van-swipe :autoplay = "1000">
               <van-swipe-item v-for="(banner,index) in bannerPicture" :key="index">
                   <img v-lazy="banner.imageUrl" width="100%"/>
               </van-swipe-item>
           </van-swipe>
       </div>
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="100%"/>
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return{
                locationIcon:require('../../assets/images/location.png'),
                bannerPicture:[
                    {imageUrl:'https://img.alicdn.com/tfs/TB1MykEwUz1gK0jSZLeXXb9kVXa-520-280.jpg_q90_.webp'},
                    {imageUrl:'https://img.alicdn.com/simba/img/TB1nOikw4z1gK0jSZSgSuuvwpXa.jpg'},
                    {imageUrl:'https://img.alicdn.com/tfs/TB1QXU3wGL7gK0jSZFBXXXZZpXa-520-280.png_q90_.webp'}
                ],
                category:[],
                advertising:'',
            }
        },
        created(){
            axios({
                url:('https://54bec635-5c60-4648-ab53-4954047cb6e3.mock.pstmn.io/index'),
                method:'get',
            }).then(response=>{
                console.log(response)
                if(response.status==404){
                    this.category = response.data.data.category;
                    this.advertising = response.data.data.advertising;
                }
            }).catch((error)=>{
            })
        }
    }
</script>

<style scoped>
    .search-bar{
        height:2.2rem;
        background-color: #ff4400;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input{
        width: 100%;
        height: 1.3rem;
        border-top: 0px;
        border-bottom: 1px solid #fff !important;
        border-right: 0px;
        background-color: #ff4400;
        color: #fff;
        
    }
    .location-icon{
        padding-top: 0.4rem;
        padding-left: 0.5rem;
    }
    .van-button{
        margin-left: 0.6rem;
    }
    .swiper-area{
        max-height: 15rem;
        clear: both;
        overflow: hidden;
    }
    .type-bar{
        background-color: #fff;
        margin: 0 0.3rem 0.3rem 0.3rem;
        border-radius: 0.3rem;
        font-size: 14px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
    }
    .type-bar div{
        padding:0.3rem;
        font-size: 12px;
        text-align: center;
    }
</style>