/*
auth路由 请求函数
*/
import ajax from './ajax.js'

export const reqLogin = (username, password, remember) => ajax('/api/auth/login', {username, password, remember}, 'POST')

export const reqRegister = (email, username, password) => ajax('/api/auth/register', {email, username, password}, 'POST')