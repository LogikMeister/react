import React, { Component } from 'react'
import './navbar.less'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-toggle">
                        <div className="icon-bar"></div>
                        <div className="icon-bar"></div>
                        <div className="icon-bar"></div>
                    </div>
                    <div className="navbar-brand">
                        <span className="logo">Logisk</span>
                        <span className="logo-behind"> 's Chat</span>
                    </div>
                </div>
            </nav>
        )
    }
}