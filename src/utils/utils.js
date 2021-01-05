/**
 * 全局公共方法
 * @author 谭邻宣
 * @date 2020/7/4 14:35
 **/

/***
 * 获取url 参数对象
 * @returns {{}}
 */
export function getUrlKey(){ //截取url 参数
    let urlParams={};
    let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
    str=str.substr(num+1); //取得所有参数 stringvar.substr(start [, length ]
    let arr=str.split("&"); //各个参数放到数组里
    for(let i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            urlParams[name] = decodeURI(value)
        }
    }
    return  urlParams ;
}

/**
 * 页面跳转方法封装
 * @param vm
 * @param params
 * @returns {boolean}
 */
export function changeTab(vm , params) {
    let {path ,keepAlive } = params;
    if(!path)  return false
    if(keepAlive){  // 开启页面缓存
        vm.$store.dispatch('tagViews/addCacheView',vm.$options.name)
    }
    vm.$router.replace({path})
}

/***
 * 通用查询参数组装 ， 默认eq
 * @param params
 * @param dict
 * @returns {string}
 */
export function formatterParams(params , dict) {
    let filterParams=[];
    for(let k in params){
        let eq = ( dict && dict[k] )|| 'eq'
        let value = eq==='like'?`%${params[k]}%`:params[k];
        if(params[k]){
            let item = '';
            if(Object.prototype.toString.call(value) === '[object Array]'){
                let interval = [ 'gt' , 'lt']; //区间值
                value.map((itm,index)=>{
                    eq=interval[index]
                    item = `${k} ${eq} ${itm}`
                    filterParams.push(item)
                })
            }else{
                item = `${k} ${eq} ${value}`
                filterParams.push(item)
            }
        }
    }
    let i = encodeURI(filterParams.join(' and '))
    return i
}

/***
 * 根据字典生成下拉选择data
 * @param dict
 * @returns {*[]}
 */
export function setSelectData (dict){
    let selectData = []
    for(let k in dict){
         selectData.push({
             value:k,
             label: dict[k]
         })
    }
    return selectData
}

/***
 * 根据用户ID ，匹配session中缓存的用户
 * @param dict
 * @returns {*[]}
 */
export function getSessionUser (userId){
    let userList =  JSON.parse(sessionStorage.getItem('usersList'))
    let userInfo = '' ;
    for(let i=0 ; i<userList.length ; i++){
        if(userList[i].user_id === userId ) {
            userInfo = userList[i]
        }
    }
    return  userInfo
}


/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  节流阈值，单位毫秒（ms）
 * @return {Function}     返回一个节流处理的函数
 */

export function debounce(fn, delay) {
    let timer
    return function () {
        let that = this,args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(that, args)
        }, delay)
    }
}



