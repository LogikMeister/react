/*
发送ajax异步请求函数模块
封装axios
*/
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, method='GET') {
    return new Promise((resolve,reject) => {
        let promise
        if(method==='GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        promise.then((response) =>{
            resolve(response)
        }).catch((error) => {
            message.error('Error: ' + error.message)
        })
    })
}