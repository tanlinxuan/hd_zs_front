
import  {setToken ,removeToken } from '@utils/utils'
import HTTP from "@httpServer";
import httpServer from "@httpServer/serverConfig";
import store from "../index";

const state={ //定义登录用户相关state
  userInfo:{}  //用户信息
}

const mutations = {
  ['USER_LOGIN'] (state,data) {  //用户登录行为触发修改
    let {userName,roleInfo ,token} = data;
    state.userInfo = {userName,roleInfo}
    setToken(token)
  },
  ['USER_EXIT'] (state,data) {  //用户登出
    let vuexData = sessionStorage.getItem('vuex')
    store.dispatch('tagViews/resultViews')
    sessionStorage.setItem('store', vuexData)
    removeToken()
    state.userInfo = {}
  }
}
const actions = {
  userLogin({ commit }, data) {
    let datas = {
      userName:'模拟用户1',
      roleInfo:'系统管理员',
      token:'1234567890'
    }
    // HTTP.post(httpServer.login,data).then(res=>{
    //   debugger
    // })
    commit('USER_LOGIN', datas )
  },
  userExit({ commit },data) {
    commit('USER_EXIT',data)
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions
}
