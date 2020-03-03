<template>
    <div>
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
       <div class="swiper-area">
           <van-swipe :autoplay = "1000">
               <van-swipe-item v-for="(banner,index) in bannerPicture" :key="index">
                   <img v-lazy="banner.imageUrl" width="100%"/>
               </van-swipe-item>
           </van-swipe>
       </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                locationIcon:require('../../assets/images/location.png'),
                bannerPicture:[
                    {imageUrl:'https://img.alicdn.com/tfs/TB1MykEwUz1gK0jSZLeXXb9kVXa-520-280.jpg_q90_.webp'},
                    {imageUrl:'https://img.alicdn.com/simba/img/TB1nOikw4z1gK0jSZSgSuuvwpXa.jpg'},
                    {imageUrl:'https://img.alicdn.com/tfs/TB1QXU3wGL7gK0jSZFBXXXZZpXa-520-280.png_q90_.webp'}
                ]
            }
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
    .swiper-area img{
        /* background-size: cover; */
    }
</style>