const mongoose = require('mongoose');
const db = "mongodb://localhost/mall-db"
const glob = require('glob');
const {resolve} = require('path');

mongoose.Promise = global.Promise

exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}
// exports.connect = () => {
//     //连接数据库
//     mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true});
//     //最大连接次数
//     let maxConnectTimes = 0
//     return new Promise((resolve, reject) => {
//         //增加数据库事件监听
//         mongoose.connection.on('disconnected', () => {
//             if (maxConnectTimes < 3) {
//                 maxConnectTimes++
//                 mongoose.connect(db)
//             }else{
//                 reject(err)
//                 throw new Error('数据库出现问题')
//             }
//         })
//         mongoose.connection.once('open', () => {
//             console.log("success");
//         })
//     })

// }
exports.connect=()=>{
    mongoose.set('useCreateIndex',true)
    mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},function(err){
        if(err){
            console.log('连接失败'+err)
        }else{
            console.log('连接成功')
        }
    })
}