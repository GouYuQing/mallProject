<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回上一级" left-arrow @click-left="goback" />
      <div class="image-show">
        <img :src="goodsInfo.IMAGE1" width="100%" />
      </div>
      <div class="goods-name">{{goodsInfo.NAME}}</div>
      <div class="goods-price">价格：${{goodsInfo.PRESENT_PRICE|moneyFilter}}</div>
      <div>
        <!-- swipeable滑动切换tab sticky 粘性布局-->
        <van-tabs swipeable sticky>
          <van-tab title="商品详情">
            <div class="detail" v-html="goodsInfo.DETAIL"></div>
          </van-tab>
          <van-tab title="评价">未制作</van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import {toMoney} from "@/filter/moneyFilter.js";

export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    //要么query接受，要么params接受
    this.goodsId = this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId;
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
            console.log(this.goodsInfo);
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.detail {
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    background-color: #FFF;
    width:100%;

    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}
.goods-bottom > div{
    flex:1;
    padding:5px;
}
</style>