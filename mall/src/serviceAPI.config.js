const BASEURL = "https://54bec635-5c60-4648-ab53-4954047cb6e3.mock.pstmn.io/";
const LOCALURl = "http://localhost:3000/"
const URL = {
    getShopingMallInfo:BASEURL+'index',//商城首页信息
    getGoodsInfo:BASEURL+'getGoodsInfo',//商品信息
    registerUser:LOCALURl+'user/register',//用户注册接口
    login:LOCALURl+'user/login',//用户登录接口
    getDetailGoodsInfo:LOCALURl+'goods/getDetailGoodsInfo',//商品信息接口
    getCategoryList:LOCALURl+'goods/getCategoryList',//商品一级分类
    getCategorySubList:LOCALURl+'goods/getCategorySubList',//商品二级分类
    getGoodsListByCategorySubID:LOCALURl+'goods/getGoodsListByCategorySubID',//根据商品二级分类id得到详细商品

}
export default URL