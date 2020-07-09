/**
 * 路由跳转前校验权限
 * @author 谭邻宣
 * @date 2020/7/4 14:23
 **/
import router from './index'
import NProgress from 'nprogress' //跳转进度条
import 'nprogress/nprogress.css'
import  {getToken} from '@utils/utils'
/****
 *
 */
router.beforeEach(async(to, from, next) => {
    NProgress.start()
    //document.title = getPageTitle(to.meta.title)
    const hasToken = getToken()
    if (hasToken) { //判断当前是否登录
        next()
    } else {
        next(`/login`)
        NProgress.done()
    }
})

router.afterEach(() => {
    NProgress.done()
})