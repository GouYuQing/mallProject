const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const Router = require('koa-router')
const { connect, initSchemas } = require('./database/init.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

app.use(cors())

//装载所有子路由
let user = require('./api/user.js')
let goods = require('./api/goods.js')
let router = new Router()
router.use('/user',user.routes())
router.use('/goods',goods.routes())

//加载路由中间件
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods)



    ; (async () => {
        await connect()
        initSchemas()
        const User = mongoose.model('User')
        // let oneUser = new User({ userName: 'yuyu', password: '85642' })
        // oneUser.save().then(() => {
        //     console.log('插入成功')
        // })
        // let users = await User.find({}).exec()
        // console.log(users)
    })()

app.use(async (ctx) => {
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})