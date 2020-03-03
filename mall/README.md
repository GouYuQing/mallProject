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

