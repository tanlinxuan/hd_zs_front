/**
 * 基本路由
 * @author 谭邻宣
 * @date 2020/7/4 14:14
 **/

const baseRouter =[
    {
        path: '/login',
        component: () => import('@src/login'),
        hidden: true
    }
]

export default baseRouter