import axios from 'axios'
import {Message} from 'element-ui'
// import store from '@/store'

// 错误提示
const Tip = msg => {
    Message({
        showClose: true,
        message: msg,
        type: 'warning'
    });
};

// 超时提示
var serve = axios.create({timeout: 1000*12});

// post响应头
serve.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';

// 请求拦截
serve.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        Tip('请求失败！')
        return Promise.reject(error)
        // Promise.error(error)
    }
);

// 状态提示
const Tips = status => {
    switch(status) {
        case 401:
            break;
        case 403:
            Tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            setTimeout(() => {}, 1000);
            break;
        case 404:
            Tip('请求资源不存在');
            break;
    }
};

// 响应拦截
serve.interceptors.response.use(
    // 成功
    res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
    // 失败
    error => {
        const {response} = error
        // 请求已经发出去
        if(response){
            Tips(response.status, response.data.message);
            return Promise.reject(response);
        }
    }
);

export default serve;
