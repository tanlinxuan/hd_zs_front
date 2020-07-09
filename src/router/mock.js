/**
 * mock data ,menu 菜单配置
 * @author 谭邻宣
 * @date 2020/7/6 14:17
 **/

const menu=[
    {
        title:"规则平台",
        name:'page1',
        code:'01',
        children:[
            {
                title:'规则列表',
                component: () => import('@src/pages/ruleList'),
                name:'list1',
                code:'01-01',
                url:'/list1',
            }
        ]
    },
    {
        title:"预警信息",
        name:'page2',
        code:'02',
        children:[
            {
                title:'预警列表',
                name:'list2',
                component:() => import('@src/pages/list2'),
                code:'02-01',url:'/list2',}
        ]
    },
    {
        title:"人员管理",
        name:'page3',
        code:'03',
        children:[
            {title:'人员列表',name:'list3-1',code:'03-01',url:'/list3',},
            {title:'人员列表1',name:'list3-2',code:'03-01',url:'/list3-1',},
        ]
    },
    {
        title:"项目管理",
        name:'page3',
        code:'04',
        children:[
            {title:'项目列表',name:'list4',code:'04-01',url:'/list4',}
        ]
    },
    {
        title:"预算审核",
        name:'page5',
        code:'05',
        children:[
            {title:'预算列表',name:'list5',code:'05-01',url:'/list5',}
        ]
    }
]

export default menu
