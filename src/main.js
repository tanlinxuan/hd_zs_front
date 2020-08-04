import Vue from 'vue'
import router from './router' // 挂载路由
import './router/permissions' // 挂载路由权限校验
import app from './app'
import store from "./utils/store";
import 'ant-design-vue/dist/antd.css';
import { message} from 'ant-design-vue'
Vue.prototype.$message = message;
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