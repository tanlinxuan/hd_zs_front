/**
 * 路由控制
 * @author 谭邻宣
 * @date 2020/7/4 14:05
 **/
import Vue from 'vue'
import Router from 'vue-router'
import Layout from  '@src/layout'
import baseRouter from "./modules/baseRouter";
import mainRouter from "./modules/mainRouter";
Vue.use(Router)
const constantRoutes = [
    ...baseRouter,
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@src/pages/home'),
                meta: { title: '首页',  affix: true }
            },
            ...mainRouter
        ]
    }
]
const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router