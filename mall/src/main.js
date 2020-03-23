// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {PullRefresh,Button,Row,Col,Swipe,SwipeItem,Lazyload,List,Field,NavBar,Tabs,Tab} from 'vant'
Vue.use(Button).use(PullRefresh).use(Row).use(Col).use(Swipe).use(Field).use(NavBar).use(Tabs).use(Tab).use(SwipeItem).use(Lazyload).use(List)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
