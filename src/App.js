import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoadableComponent from '@/utils/loadable.js'

const Login = LoadableComponent(()=>import('@/pages/login/login.jsx'))
const Blog = LoadableComponent(()=>import('@/pages/blog/blog.jsx'))
// import Login from '@/pages/login/login.jsx'
// import Blog from '@/pages/blog/blog.jsx'

export default  class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Blog}></Route>
                    <Route path='/login' component={Login}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
