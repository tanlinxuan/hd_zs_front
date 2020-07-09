/**
 * 全局公共方法
 * @author 谭邻宣
 * @date 2020/7/4 14:35
 **/
import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}