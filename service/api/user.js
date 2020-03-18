const Router = require ('koa-router');
const mongoose = require('mongoose');

let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
router.post('/register',async(ctx)=>{
    // console.log(ctx.request.body)
    ctx.body= ctx.request.body
    //获取model
    const User = mongoose.model('User');
    //把收到的数据封装成新的用户存入数据库
    const newUser = new User(ctx.request.body);
    await newUser.save().then(()=>{
        ctx.body = {
            code:200,
            message:"注册成功"
        }
    }).catch((err)=>{
        ctx.body={
            //服务器错误
            code:500,
            message:err
        }
    })
    // let users = await User.find({}).exec();
    // console.log(users);
})
module.exports=router;