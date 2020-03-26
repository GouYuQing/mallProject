<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车"></van-nav-bar>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                carInfo:[],//商品数据
                isEmpty:false,//购物车是否为空
            }
        },
        created(){
            this.getCarInfo()
        },
        methods:{
            getCarInfo(){
                if(localStorage.carInfo){
                    //字符串解析出json对象并赋值给carInfo
                    this.carInfo = JSON.parse(localStorage.carInfo);
                }
                this.isEmpty = this.carInfo.lenght>0?true:false;
            }
        }
    }
</script>

<style scoped>

</style>