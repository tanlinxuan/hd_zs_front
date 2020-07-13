/**
 * axios 封装
 * @author 谭邻宣
 * @date 2020/7/10 16:24
 **/
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken} from '@utils/utils'
import store from "@utils/store";
const message = Message;
const HTTP = axios.create({
    timeout: 3 * 60 * 1000, //三分钟超时
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    }
})
HTTP.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
HTTP.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== '0000') {
            message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default HTTP