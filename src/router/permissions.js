/**
 * 路由跳转前 , 校验权限 ，处理tab页签
 * @author 谭邻宣
 * @date 2020/7/4 14:23
 **/
import router from './index'
import store from "@utils/store";
import NProgress from 'nprogress' //跳转进度条
import 'nprogress/nprogress.css'
import  {getToken} from '@utils/utils'

router.beforeEach(async(to, from, next) => {
    NProgress.start()
    const hasToken = getToken() //获取token
    if (hasToken) { //判断 token 是否存在 ，API 请求 token 超时 ，会清空token 执行该跳转
        if(to.path === '/login'){
            next()
        }else{
            const visitedViews=store.getters.visitedViews; // 获取 store 缓存的当前所有打开页面
            let visitedPath = to.fullPath;
            const hasView=visitedViews.some(item=>{ return item.path === visitedPath}) // 判断当前缓存里是否已有此页面
            const _View= {
                name:to.name,
                path:visitedPath,
                title:to.query.title? `${to.meta.title}(${to.query.title})`:to.meta.title
            }
            if(hasView){
                store.dispatch('tagViews/changeViewList', _View)
            }else{
                store.dispatch('tagViews/addViewList', _View)
            }
            next()
        }
    } else {
        if (to.path === '/login') { // 如果是登录页面的话，直接next()
            next();
        } else { // 否则 跳转到登录页面
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})