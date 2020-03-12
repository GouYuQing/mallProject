const Koa = require('koa');
const app = new Koa();
const {connect}  = require('./database/init.js');

;(async()=>{
    await connect()
})()
app.use(async(ctx)=>{
    ctx.body='<h1>hello world</h1>'
})
app.listen(3000,()=>{
    console.log('server is running');
})