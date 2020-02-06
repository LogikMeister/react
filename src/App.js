import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from '@/pages/login/login.jsx'
import Blog from '@/pages/blog/blog.jsx'

export default  class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Blog}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
