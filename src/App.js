import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoadableComponent from '@/utils/loadable.js'

const Auth = LoadableComponent(()=>import('@/pages/auth/auth.jsx'))
const Chat = LoadableComponent(()=>import('@/pages/chat/chat.jsx'))
// import Login from '@/pages/login/login.jsx'
// import Blog from '@/pages/blog/blog.jsx'

export default  class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Chat}></Route>
                    <Route path='/login' component={Auth}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
