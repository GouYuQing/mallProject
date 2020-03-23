<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <!-- class动态绑定 -->
              <li
                v-for="(item,index) in category"
                :key="index"
                @click="clickCategory(index)"
                :class="{white:categoryIndex==index}"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="div-list">
            <!-- 下拉刷新效果实现 ，上拉加载-->
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" v-for="(item,index) in goodsList" :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div class>${{item.ORI_PRICE}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      category: [], //分类数组
      categoryIndex: 0, //默认一级分类指向第一个
      categorySub: [], //二级分类数组
      active: 0, //二级分类默认激活
      loading: false, //上拉加载
      finished: false, //是否没有数据了
      list: [], //商品数据
      isRefresh: false, //下拉加载
      page: 1, //商品列表的页数
      goodsList: [], //商品列表信息
      categorySubId: "" ,//二级商品信息
       errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"',  //错误图片显示路径

    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    //左右侧页面撑开
    let scnnerHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = scnnerHeight - 46 + "px";
    document.getElementById("div-list").style.height = scnnerHeight - 90 + "px";
  },
  methods: {
    //得到一级分类
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          // console.log(response);

          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器取得数据失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
     clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodsList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    //得到二级分类通过一级id
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(response => {
          // console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.twoCategory = response.data.message;
            console.log(this.twoCategory);
            this.active = 0;
          } else {
            Toast.fail("数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //onLoad()上拉加载
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
        // ? this.categorySubId: this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    //下拉加载
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodsList = [];
        this.page = 1;
        this.onLoad(); //刷新页面
      }, 500);
    },
    //得到二级商品详情信息
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodsList = this.goodsList.concat(response.data.message);
          } else {
            //没有数据了
            this.finished = true;
          }
          this.loading = false;
          // console.log(this.finished);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点击子类获取商品信息
    onClickCategorySub(index, title) {
      this.categoryTwoId = this.categorySub[index].ID;
      this.goodsList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    }
  }
};
</script>

<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.white {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#div-list {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>