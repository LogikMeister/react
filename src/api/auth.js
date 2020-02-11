/*
auth路由 请求函数
*/
import ajax from './ajax.js'

export const reqLogin = (username, password) => ajax({
    url: '/auth/login',
    method: 'POST',
    data: {username, password}
})

export const reqRegister = (email, username, password) => ajax({
    url: '/auth/register',
    method: 'POST',
    data: {email, username, password}
})
