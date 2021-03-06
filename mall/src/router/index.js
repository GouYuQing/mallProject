import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import Category from '@/components/pages/Category'
import ShoppingCar from '@/components/pages/ShoppingCar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/goods',
      name:'Goods',
      component:Goods
    },
    {
      path:'/category',
      name:'Category',
      component:Category
    },
    {
      path:'/shoppingCar',
      name:'ShoppingCar',
      component:ShoppingCar
    }
  ]
})
