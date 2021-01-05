/**
 * main pages 页面路由
 * @author 谭邻宣
 * @date 2020/7/6 14:32
 **/
import pageRouter from "@router/router";
const isArray = arr =>{
    return Object.prototype.toString.call(arr) === '[object Array]'?true:false
}
const flatten = arr => arr.reduce((prev, next) => { //递归调用 ，展开 menu 数据 ，将含有url 的配置添加进 router
    let {name,path,title,component,children ,keepAlive} = next;
        if (isArray(children)) return prev.concat(flatten(children));
        if (path) {
            let routerConfig = {
                path, name, component,
                meta: { title: title, keepAlive: keepAlive }
            }
            return  prev.concat(routerConfig)
        }
    },[])
const mainRouter =[...flatten(pageRouter)];
export default mainRouter