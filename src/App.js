import React, {Component} from 'react'
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom'

import LoadableComponent from '@/utils/loadable.js'

// const Auth = LoadableComponent(()=>import('@/pages/auth/auth.jsx'))
// const Chat = LoadableComponent(()=>import('@/pages/chat/chat.jsx'))
import Auth from '@/pages/auth/auth.jsx'
import Chat from '@/pages/chat/chat.jsx'

export default  class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Auth}></Route>
                    <Route path='/app' component={Chat}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
