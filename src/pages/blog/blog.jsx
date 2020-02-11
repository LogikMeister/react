import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class Blog extends Component {
    render() {
        if(!localStorage.getItem('token')) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                Blog!
            </div>
        )
    }
}
