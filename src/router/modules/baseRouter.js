/**
 * 基本路由
 * @author 谭邻宣
 * @date 2020/7/4 14:14
 **/

const baseRouter =[
    {
        path: '/login',
        component: () => import('@pages/common/login'),
        hidden: true
    },
    {
        path: '/map',
        component: () => import('@pages/common/map'),
        hidden: true
    }
]

export default baseRouter