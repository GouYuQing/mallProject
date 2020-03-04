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

