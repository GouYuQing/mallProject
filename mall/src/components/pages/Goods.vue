<template>
    <div>
        商品页面
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
    export default {
        data(){
            return{
                goodsId:''
            }
        },
        created(){
            this.goodsId = this.$route.query.goodsId
            this.getInfo()
        },
        methods:{
            getInfo(){
                axios({
                    url:url.getDetailGoodsInfo,
                    method:'post',
                    data:{
                        goodsId:this.goodsId
                    }
                })
                .then(response=>{
                    console.log(response)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>