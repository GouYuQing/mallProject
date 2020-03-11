<template>
  <div>
      <swiper :option="swiperOption" class="swiper">
          <swiper-slide class="text">
              <div>本节课程主要使用了vue-awesome-swiper组件，大家虽然做出了效果，但是对swiper组建的使用还不清楚，我们接下来会用几节课时间讲一下vue-awesome-swiper这个组件，因为他在项目中经常使用，而且效果还不错本节课程主要使用了vue-awesome-swiper组件，大家虽然做出了效果，但是对swiper组建的使用还不清楚，我们接下来会用几节课时间讲一下vue-awesome-swiper这个组件，因为他在项目中经常使用，而且效果还不错本节课程主要使用了vue-awesome-swiper组件，大家虽然做出了效果，但是对swiper组建的使用还不清楚，我们接下来会用几节课时间讲一下vue-awesome-swiper这个组件，因为他在项目中经常使用，而且效果还不错本节课程主要使用了vue-awesome-swiper组件，大家虽然做出了效果，但是对swiper组建的使用还不清楚，我们接下来会用几节课时间讲一下vue-awesome-swiper这个组件，因为他在项目中经常使用，而且效果还不错</div>
          </swiper-slide>
      </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperItem } from "vue-awesome-swiper";
export default {
    data(){
        return{
           swiperOption:{
               direction:'vertical',
               slidesPerView:'auto',
               freeMode:true,
               mousewheel:true
           }
        }
    },
    components:{swiper,swiperItem}
};
</script>

<style scoped>
.swiper{
    height:300px;
    overflow: hidden;
}
.text{
    font-size: 18px !important;
    text-align: left;
    padding:30px;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>