const Router = require('koa-router');
const mongoose = require('mongoose');

let router = new Router()
const fs = require('fs')

router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile('./dataJson/goods.json', 'utf8', (err, data) => {
        //字符串转换成对象 Json.stringify()对象转换成字符串
        data = JSON.parse(data);
        // let saveCount = 0;
        const Goods = mongoose.model('Good');
        data.map((value, index) => {
            // console.log(value)
            let newGoods = new Goods(value);
            newGoods.save().then(() => {
                // saveCount++;
                console.log('success');
            }).catch((err) => {
                console.log('failed' + err)
            })
        })

    })
    ctx.body = '开始导入数据'
})
router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./dataJson/category.json', 'utf8', (err, data) => {
        //字符串转换成对象 Json.stringify()对象转换成字符串
        data = JSON.parse(data);
        // let saveCount = 0;
        const Category = mongoose.model('Category');
        data.RECORDS.map((value, index) => {
            // console.log(value)
            let newCategory = new Category(value);
            newCategory.save().then(() => {
                // saveCount++;
                console.log('success');
            }).catch((err) => {
                console.log('failed' + err)
            })
        })

    })
    ctx.body = '开始导入数据'
})
router.get('/insertAllCategorySub', async (ctx) => {
    fs.readFile('./dataJson/category_sub.json', 'utf8', (err, data) => {
        //字符串转换成对象 Json.stringify()对象转换成字符串
        data = JSON.parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub');
        data.RECORDS.map((value, index) => {
            // console.log(value)
            let newCategorySub = new CategorySub(value);
            newCategorySub.save().then(() => {
                saveCount++;
                console.log('success' + saveCount);
            }).catch((err) => {
                console.log('failed' + err)
            })
        })

    })
    ctx.body = '开始导入数据'
})
router.post('/getDetailGoodsInfo', async (ctx) => {
    try {
        let goodsId = ctx.request.body.goodsId;
        const Good = mongoose.model('Good')
        let result = await Good.findOne({ ID: goodsId }).exec()
        ctx.body = { code: 200, message: result }
    } catch (err) {
        ctx.body = { code: 500, message: err }
    }

})
//得到一级分类
router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})
//得到二级分类
router.post('/getCategorySubList', async (ctx) => {
    try {
        let categoryId = ctx.request.body.categoryId
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})
//根据商品二级分类id得到详细商品
router.post('/getGoodsListByCategorySubID', async (ctx) => {
    try {
        let categorySubId = ctx.request.body.categorySubId;//二级分类id
        let page = ctx.request.body.page;//当前页数
        let num = 10;//每页显示数量
        let start = (page - 1) * num//开始位置

        const Goods = mongoose.model('Good');
        //skip 跳过数量 limit显示数量
        let result = await Goods.find({ SUB_ID: categorySubId })
            .skip(start).limit(num).exec()
        ctx.body = { code: 200, message: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }
})
module.exports = router;