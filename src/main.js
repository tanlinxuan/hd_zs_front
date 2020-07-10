import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router' // 挂载路由
import './router/permissions' // 挂载路由权限校验
import app from './app'
import store from "./utils/store";
Vue.use(ElementUI)
new Vue({
    el:'#app',
    router,
    store,
    render:(h)=>h(app)
})