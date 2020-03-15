const BASEURL = "https://54bec635-5c60-4648-ab53-4954047cb6e3.mock.pstmn.io/";
const LOCALURl = "http://localhost:3000/"
const URL = {
    getShopingMallInfo:BASEURL+'index',//商城首页信息
    getGoodsInfo:BASEURL+'getGoodsInfo',//商品信息
    registerUser:LOCALURl+'user/register',//用户注册接口
}
module.exports = URL