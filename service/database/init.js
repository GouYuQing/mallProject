const mongoose = require('mongoose');
const db = "mongodb://localhost/mall-db"

mongoose.Promise = global.Promise

exports.connect=()=>{
    //连接数据库
    mongoose.connect(db);
    //增加数据库事件监听
    mongoose.connection.on('disconnected',()=>{
        mongoose.connect(db)
    })
    mongoose.connection.on('error',err=>{
        console.log(err);
        mongoose.connect(db)
    })
    mongoose.connection.once('open',()=>{
        console.log("success");
    })
}