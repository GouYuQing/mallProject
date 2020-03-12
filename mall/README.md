# mall
> A Vue.js project

### 前端

#### 初始化

##### 1.1使用vue-cli生成目录

```
npm install vue-cli -g

vue init webpack

//测试

npm run dev
```

##### 1.2使用Vant作为组件库

安装

```
npm install vant --save
```

引入

全局引入

```
import Vant from 'vant'

import 'vant/lib/vant-css/index.css'

Vue.use(vant)
```

按需引入

安装

```
npm install babel-plugin-import --save-dev
```

```
在.babelrc中配置plugins
"plugins": [

  "transform-vue-jsx", 

  "transform-runtime",

  ["import",{"libraryName":"vant","style":true}]

 ]
```
##### 1.3 移动端适配方法

1. 固定高度，宽度百分比
2. Media Query（媒体查询)：bootstrap
3. flex布局：尽量使用flex+rem进行布局和移动端的适配、

`rem`（font size of the root element）是相对长度单位。相对于根元素（即html元素）`font-size`计算值的倍数。

##### 1.4 定位 搜索框搜索按钮

icon图标的下载：在https://www.iconfont.cn/阿里巴巴图标矢量库

正确引入图片：

使用require("路径")，然后：

```
<img :src="locationIcon" width="100%" />
```

##### 1.5 轮播图区域

使用Swipe, SwipeItem，懒加载Lazyload,先引入，然后将图片地址直接放在一个数组中,chrome浏览器下模拟`slow 3G`可以看懒加载效果

##### 1.6 easy-mock

由于网站又崩了，没办法使用，所以在本地建立数据，但是无法获得数据

现在使用postman来模拟数据

制作分类展示（使用flex布局）和广告部分，

##### 1.7 商品推荐 使用轮播图插件vue-awesome-swiper

vue-awesome-swiper可以做轮播图，可以做滚动，可以全局挂载也可以组件使用

新建一个`swiperDefault.vue`文件

```
<template>
  <div >
      <swiper>
        <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
           Slide {{item}} 
        </swiper-slide>
      </swiper>
  </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                slide: [1,2,3,4,5,6]
            }
        },
        components:{swiper,swiperSlide}
    }
</script>

<style scoped>
  .swiper-slide{
      height: 4rem;
      text-align: center;
      padding-top: 3rem;
      border-bottom: 1px solid #ccc;
  }
</style>
```

引入：

```javascript
import swiperDefault from '../swiper/swiperDefault'
```

注册组件：components:{swiperDefault}

然后在template中直接使用：<swiperDefault></swiperDefault>

在data里面可以进行配置各种属性，然后在template里面添加就好了：

```javascript
swiperOption:{
    pagination:{
        el:'.swiper-pagination'//可以分页
    }
    direction:'vertical',//竖屏切换
    freeMode:true,//slide会根据惯性滑动可能不止一格且不会贴合
    mousewheel:true，//开启鼠标滚轮控制Swiper切换
    slidesPerView: 'auto',//设置同屏显示的数量，默认为1，使用auto是随意
}
```

##### 1.8首页最后布局

引入图片各种商品使用flex布局

但是为了代码复用，现在把这部分代码封装成一个可以传递参数的组件，使用watch来监听参数变化

##### 1.9 过滤器Filter的使用

src下新建filter文件夹，可以存放所有的过滤器

一个moneyFliter.js

```
filters:{
    moneyFilter(money){
        return toMoney(money)
    }  
},
```

引入

```
import {toMoney} from '@/filter/moneyFilter.js'
```

`@`代表的是`src`目录的意思，在`/build/webpack.base.conf.js`里可以找到这个配置

使用：

```
filters:{
    moneyFilter(money){
        return toMoney(money);//toMoney方法需要和引入的名字一样
    }  
},
```

然后使用：item.price | moneyFilter

##### 1.10 编写热卖产品 使用van-list组件

引入，在`/src/App.vue`文件中

```javascript
import { List } from 'vant'
Vue.use(List)
```

编写goodsInfo.vue

引入组件

```
import goodsInfo from '../component/goodsInfoComponent'
```

```
components: { goodsInfo },
```

##### 1.11编写后台服务接口配置文件

src目录下建立`serviceAPI.config.js`

```
const BASEURL = "....."//基本地址
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo'
}

module.exports = URL
```

引入：

```javascript
import url from '@/serviceAPI.config.js'
```

使用：将地址修改
axios({
    url: url.getShoppingMallInfo,
    method: 'get',
})