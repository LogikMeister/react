/*简单ajax交互 */
// export default function ajax(url, data={}, method='GET') {
//     return new Promise((resolve,reject) => {
//         let promise
//         if(method==='GET') {
//             promise = axios.get(url, {
//                 params: data
//             })
//         } else {
//             promise = axios.post(url, data)
//         }
//         promise.then((response) =>{
//             resolve(response)
//         }).catch((error) => {
//             message.error('Error: ' + error.message)
//         })
//     })
// }

/*
ajax异步请求模块
封装axios实现自动刷新token的身份验证机制
*/
import axios from 'axios'
import {message} from 'antd'
import memoryUtils from '../utils/memoryUtils'

export default function ajax(options) {
    const checkToken = (response) => checkTokenDecorator(options, response)
    return request(options).then((response) => checkToken(response))
}

function request(options) {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        options['headers'] = {Authorization: token}
        let promise
        promise = axios(options)
        promise.then((response) => {
            resolve(response)
        }).catch((error) => {
            message.error('Error: ' + error.message)
        })
    })
}

function checkTokenDecorator(options, response) {
    if(localStorage.getItem('token')){
        if(response && response.status === 1000){
            if(!memoryUtils.isRefreshing){
                memoryUtils.isRefreshing = true
                refreshTokenRequset()
            }
            const retryResponse = new Promise((resolve, reject) =>{
                addSubscriber(() => {
                    resolve(request(options))
                })
            })
            return retryResponse
        } else {
            return response
        }
    } else {
        return response
    }
}

function refreshTokenRequset(){
    const refreshToken = localStorage.getItem('refreshToken')
    return request({
        url: '/api/auth/token',
        method: 'GET',
        headers: {Authorization: refreshToken}
    }).then((response) => {
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        localStorage.setItem('token',response.data.data.token)
        mount()
        memoryUtils.isRefreshing = false
    })
}

function mount(){
    memoryUtils.subscriber.forEach(callback => {
        callback()
    });
    memoryUtils.subscriber = []
}


function addSubscriber(callback){
    memoryUtils.subscriber.push(callback)
}