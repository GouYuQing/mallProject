#### 后端
##### 2.1 初始化

```
mkdir service
cd service
npm init -y
npm install --save koa
```

新建index.js

然后启动node index.js 说明koa安装成功

##### 2.2 连接mongoose数据库

Mongoose是一个开源的封装好的实现Node和MongoDB数据通讯的数据建模库。

安装

```shell
npm install mongoose --save
```

```
const mongoose = require('mongoose')
const db = "mongodb://localhost/mall-db"

exports.connect = ()=>{
    //连接数据库
    ...   
        })
```

##### 2.3 建模，定义Schema

Schema：json文件形式存储,数据库模型骨架，不具备对数据库的操作能力，但是是连接数据库和操作的，

作为数据库的映射，定义表的模板

model ：具备某张表操作能力的一个集合，模型就是这个Model。

entity:model创建的实体，具有影响数据库的操作能力

```
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
//创建我们的用户Schema
const userSchema = new Schema({
    UserId:Schema.Types.ObjectId,//声明Object类型
    userName:{unique:true,type:String},
    password:String,
   ...
})
//发布模型
mongoose.model('User',userSchema)
```

##### 2.4 载入数据库，可以查询数据

安装glob

```javascript
npm install glob --save

const glob = require('glob')
const {resolve} = require('path')
```

一次性全局引入Schema文件

```
exports.initSchemas = () =>{
//resolve: 将路径解析为绝对路径
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}
```

##### 2.5 安全加密加盐

加密算法：MD5和hash256等

加盐：用户密码太简单，所以自己添加其他的字符串在里面，我们可以设置加入字符串的长短，加盐之后再进行加密

bcrypt的使用

安装：`npm instal --save bcrypt`

引入：`const bcrypt = require('bcrypt')`

具体操作：

```javascript
const SALT_WORK_FACTOR = 10;
//每次存储数据时都要执行pre
userSchema.pre('save', function(next){
    bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{//加盐
        if(err) return next(err)
        bcrypt.hash(this.password,salt, (err,hash)=>{//对密码加密
            if(err) return next(err)
            this.password = hash
            next()//向下执行
        }) 

    })
})
```

##### 2.6 编写前端注册页面

router/index.js路由添加

```
import Register from '@/components/pages/Register'
{path: '/register',name: 'Register',component: Register},
```

编写注册页面

##### 2.7 后台路由模块化

```shell
npm install koa-router --save
```

建立api文件夹，进行接口编写

```
const Router = require ('koa-router')
let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
...
module.exports=router;
```

在index.js中引入这个文件然后就可以使用了

```
const Router = require('koa-router')
let user = require('./api/user.js')//引入了user模块
let router = new Router();//装载子路由
router.use('/user',user.routes())
app.use(router.routes())//加载路由中间件
app.use(router.allowedMethods())
```

##### 2.8 前后端连接起来

后端：安装可以接受post请求的中间件koa-bodyparser

```
npm install --save koa-bodyparser
```

引入使用：

```
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());
```

前端编写注册按钮方法，发送请求，重新配置接口地址，在serviceAPI.config.js中

解决跨域问题：安装koa2-cors

引入使用：
```
const cors = require('koa2-cors')
app.use(cors())
```
##### 2.9 用户注册然后写入数据库

500服务器异常

得到前端数据之后，封装成一个user对象，直接存入数据库中。

前端用户输入数据之后，判断数据的正确性，做出提示，不允许提交空值，（后期改变成正则表达式）然后post提交到后台

防止重复提交，给用户一个提示，设置loadding属性，:loading="openLoading"。

解决数据库里面的表名多加了S:

```javascript
const userSchema = new Schema({
},{
    collection:'user'//可以不要s，自己定义集合名字
})
```

##### 2.10登录页面

和注册页面一样

##### 2.11 批量插入数据到MongoDB中
插入goods，category、categorySub数据，建立Schema