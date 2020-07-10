
const state={ //定义登录用户相关state
  userInfo:{}  //用户信息
}

const mutations = {
  ['USER_LOGIN'] (state,data) {  //用户登录行为触发修改
    state.userInfo = {...data}
  }
}
const actions = {
  userLogin({ commit }, data) {
    commit('USER_LOGIN', data )
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions
}
