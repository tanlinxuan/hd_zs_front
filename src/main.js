import Vue from 'vue'

import router from './router' // 挂载路由
import './router/permissions' // 挂载路由权限校验
import store from "./utils/store" //加载状态管理

import echarts from 'echarts' // 全局注册echarts
import {  message } from 'ant-design-vue'; //全局注册 message
import app from './app'  //主页面

import 'ant-design-vue/dist/antd.css';
Vue.prototype.$message = message;
Vue.prototype.$echarts = echarts;
message.config({
    duration: 2,// 持续时间
    top:`100px`, // 到页面顶部距离
    maxCount: 1 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});
new Vue({
    el:'#app',
    router,
    store,
    render:(h)=>h(app)
})