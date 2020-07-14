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
                component: () => import('@src/pages/ruleManage/ruleList'),
                name:'ruleManageList',
                path:'/ruleManageList',
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
                component:() => import('@src/pages/warningManage/warningList'),
                path:'/warningManageList'
            }
        ]
    }
]

export default menu
