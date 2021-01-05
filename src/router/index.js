/**
 * 路由控制
 * @author 谭邻宣
 * @date 2020/7/4 14:05
 **/
//import Vue from 'vue'

import PageLayout from  '@src/layout'
import baseRouter from "./modules/baseRouter";
import mainRouter from "./modules/mainRouter";
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
//Vue.use(Router)
const constantRoutes = [
    ...baseRouter,
    {
        path: '/',
        component: PageLayout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@pages/common/home'),
                meta: { title: '首页', affix: true }
            },
            {
                path: '404',
                name: '404',
                component: () => import('@pages/common/error/404.vue'),
                meta: { title:'No Found', affix:true}
            },
            ...mainRouter
        ]
    }
]
export const asyncRoutes = []

const createRouter = () => new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router