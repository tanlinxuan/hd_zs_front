/**
 * tab 页相关 store
 * @author 谭邻宣
 * @date 2020/7/13 11:01
 **/
import mainRouter from '@router/modules/mainRouter'

const getPageInfo = path => {
    let routeUrl = path , activePage={};
    if(path.indexOf('?') > -1){
        routeUrl = path.substring(0,path.indexOf('?'));
    }
    mainRouter.map(item=>{
        if(item.path === routeUrl){
            activePage = {
                name:item.name,
                title:item.meta.title,
                path
            }
        }
    })
    return activePage
}

const state={
    pageInfo:{
        pageTabs:[
            {path:'/home', name:'home', title:'首页'}
        ],
        activePath:{
            name:'home',
            path:'/home'
        },
    }
}

const mutations = {
    ['ADD_TAB'](state , path){
        let item = getPageInfo(path)
        state.pageInfo.pageTabs.push(item)
        state.pageInfo.activePath = item
    },
    ['CHANGE_TAB'](state , path){
        state.pageInfo.activePath = getPageInfo(path)
    },
    ['CLOSE_TAB'](state , path){
        let activeIndex=0
        let pageTabs = state.pageInfo.pageTabs.reduce((prev, cur, index) =>{
            if(cur.path !== path){
                prev.push(cur)
            }else{
                activeIndex = index
            }
            return prev
        },[])
        state.pageInfo.pageTabs=pageTabs
        if(pageTabs.length>activeIndex){
            debugger
            state.pageInfo.activePath = pageTabs[activeIndex]
        }else{
            debugger
            state.pageInfo.activePath = pageTabs[pageTabs.length-1]
        }
    }
}
const actions = {
    addTab({commit} , path){  //打开页面操作
        let pageState = JSON.parse(sessionStorage.getItem('vuex')), hasActivePage = false;
        let datas = pageState?.pageTab?.pageInfo;
        if(datas){
            let {pageTabs} = datas
            hasActivePage = pageTabs.some(item=> { return item.path === path})
        }
        if(hasActivePage){
            commit('CHANGE_TAB',path)
        }else{
            commit('ADD_TAB',path)
        }
    },
    changeTab({commit},path){
        commit('CHANGE_TAB',path)
    },
    closeTab({commit},path){
        commit('CLOSE_TAB',path)
    }

}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}
