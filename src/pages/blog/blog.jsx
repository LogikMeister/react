import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils'

export default  class Blog extends Component {
    render() {
        const user = memoryUtils.current_user
        let username
        if (!user || !user.token){
            //get 未登录主页面数据
            username = 'stanger'
        } else {
            //get 登陆用户的页面数据
            username = user.username
        }

        return (
            <div>
                Blog! {username}
            </div>
        )
    }
}

