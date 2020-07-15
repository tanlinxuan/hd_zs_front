/**
 * mock data ,menu 菜单配置
 * @author 谭邻宣
 * @date 2020/7/6 14:17
 **/


const menu=[
    {
        title:"规则平台",
        name:'ruleManage',
        children:[
            {
                title:'规则列表',
                component: () => import('@pages/ruleManage/ruleList'),
                name:'ruleManageList',
                isMenu:true,  // 此页面是否渲染导航栏
                path:'/ruleManageList'
            },
            {
                title:'规则详情',
                component: () => import('@pages/ruleManage/ruleList/detail'),
                name:'ruleDetail',
                path:'/ruleManageList/detail'
            }
        ]
    },
    {
        title:"预警信息",
        name:'warningManage',
        children:[
            {
                title:'预警列表',
                name:'warningManageList',
                isMenu:true,
                component:() => import('@pages/warningManage/warningList'),
                path:'/warningManageList'
            }
        ]
    }
]

export default menu
