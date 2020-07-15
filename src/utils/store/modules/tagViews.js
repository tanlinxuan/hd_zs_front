/**
 * tag 页签store ，用作缓存页面
 * @author 谭邻宣
 * @date 2020/7/14 16:21
 **/

const defaultView= {title:'首页', path:'/home', name:'home'}//默认页签
const state={
    visitedViews:[
        defaultView
    ],
    activeView:defaultView
}

const mutations = {
    ['ADD_VIEWS'](state , view){
        state.visitedViews.push(view)
        state.activeView = view
    },
    ['CHANGE_VIEWS'](state , view){
        state.activeView = view
    },
    ['REMOVE_VIEWS'](state , view){
        let activeIndex=0
        let pageTabs = state?.visitedViews?.reduce((prev, cur, index) =>{
            if(cur.path !== view.path){
                prev.push(cur)
            }else{
                activeIndex = index
            }
            return prev
        },[])
        state.visitedViews=pageTabs
        if(activeIndex < pageTabs.length){
            state.activeView = pageTabs[activeIndex]
        }else{
            state.activeView = pageTabs[pageTabs.length-1]
        }
    }
}
const actions = {
    addViewList({commit} , view) {
        commit('ADD_VIEWS',view)
    },
    changeViewList({commit} , view) {
        commit('CHANGE_VIEWS',view)
    },
    removeViewList({commit} , view) {
        commit('REMOVE_VIEWS',view)
    },
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}