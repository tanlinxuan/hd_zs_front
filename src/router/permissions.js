/**
 * 路由跳转前校验权限
 * @author 谭邻宣
 * @date 2020/7/4 14:23
 **/
import router from './index'
import NProgress from 'nprogress' //跳转进度条
import 'nprogress/nprogress.css'
import  {getToken} from '@utils/utils'
/*****
 *
 */
router.beforeEach(async(to, from, next) => {
    NProgress.start()
    //document.title = getPageTitle(to.meta.title)
    const hasToken = getToken()
    if (hasToken) { //判断token 是否存在 ，API 请求 token 超时 ，会清空token 执行该跳转
        next()
    } else {
        if (to.path === '/login') { // 如果是登录页面的话，直接next()
            next();
        } else { // 否则 跳转到登录页面
            next(`/login`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})