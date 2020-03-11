<template>
  <div>
    <!-- 导航搜索 -->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="65%" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="small" type="warning">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicture" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 类别 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="100%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告位 -->
    <div class="advertising">
      <img v-lazy="advertising.PICTURE_ADDRESS" width="100%" />
    </div>
    <!-- 商品推荐 -->
    <div class="recommend">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommend" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  <floorComponent :floorData="floor1"></floorComponent>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from '../component/floorComponent';
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("../../assets/images/location.png"),
      bannerPicture: [],
      category: [],
      advertising: "",
      recommend: [],
      floor1: [],
    };
  },
  components: { swiper, swiperSlide,floorComponent },
  created() {
    axios({
      url: "https://54bec635-5c60-4648-ab53-4954047cb6e3.mock.pstmn.io/index",
      method: "get"
    })
      .then(response => {
        console.log(response.data.data);
        console.log(response.data.data.advertesPicutre);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.advertising = response.data.data.advertesPicture;
          this.bannerPicture = response.data.data.slides;
          this.recommend = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
        }
      })
      .catch(error => {});
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #ff4400;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-bottom: 1px solid #fff !important;
  border-right: 0px;
  background-color: #ff4400;
  color: #fff;
}
.location-icon {
  padding-top: 0.8rem;
  padding-left: 0.3rem;
}
.van-button {
  margin-left: 0.3rem;
}
.swiper-area {
  max-height: 15rem;
  clear: both;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  font-size: 14px;
  border-bottom: 1px solid #eee;
  padding: 0.2rem;
  columns: #ff4400;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

</style>