const mongoose = require('mongoose')
const db = "mongodb://localhost/mall-db"
const glob = require('glob')
const {resolve} = require('path')

mongoose.Promise =  global.Promise
exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}
exports.connect = ()=>{
    //连接数据库
    mongoose.set('useCreateIndex', true) 
    mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true })

    //增加数据库连接的事件监听
    mongoose.connection.on('disconnected',()=>{
        //进行重连
        mongoose.connect(db)
    })

    //数据库出现错误的时候
    mongoose.connection.on('error',err=>{
        console.log(err)
        mongoose.connect(db)
    })

    //链接打开的时候
    mongoose.connection.once('open',()=>{
        console.log('数据库连接成功!')
    })

}