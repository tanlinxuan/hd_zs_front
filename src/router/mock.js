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
                title:'规则列表', //页面名称
                component: () => import('@pages/ruleManage/ruleList'), // 引用 component
                name:'ruleList', // 与对应的component name名称保持一致 ，否则无法开启 页面缓存
                isMenu:true,  // 是否渲染进导航栏
                path:'/ruleManageList'  //路径
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
