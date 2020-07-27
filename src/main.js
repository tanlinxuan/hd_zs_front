import Vue from 'vue'
import router from './router' // 挂载路由
import './router/permissions' // 挂载路由权限校验
import app from './app'
import store from "./utils/store";

new Vue({
    el:'#app',
    router,
    store,
    render:(h)=>h(app)
})