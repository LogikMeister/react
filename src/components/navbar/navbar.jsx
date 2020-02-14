import React, { Component } from 'react'
import './navbar.less'

export default class Navbar extends Component {
    render() {
        return (
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-toggle">
                        <div class="icon-bar"></div>
                        <div class="icon-bar"></div>
                        <div class="icon-bar"></div>
                    </div>
                    <div class="navbar-brand">
                        <span class="logo">Logisk</span>
                        <span class="logo-behind"> 's Chat</span>
                    </div>
                </div>
            </nav>
        )
    }
}