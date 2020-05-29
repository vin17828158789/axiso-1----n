// import axios from 'axios'
// import qs from 'qs'
import http from './http'
import base from './baseURL'

/**
 * OSAUTHEN服务接口
 */
// 登录
function start_login(obj){
    return http.post(`${base.baseURL_8080}/apigateway/osauthen/login`,
        obj)
}
// 登出
function logout(obj){
    return http.post(`${base.baseURL_8080}/apigateway/osauthen/logout`,
        obj)
}
// 暴露接口
export default {
    start_login,
	logout
}
/**
 *
 */