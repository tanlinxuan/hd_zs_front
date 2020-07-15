const getters = {
  userInfo: state => state.user.userInfo, //用户信息
  visitedViews: state => state.tagViews.visitedViews, //views页签信息
  activeView: state => state.tagViews.activeView, //views页签信息
}
export default getters
