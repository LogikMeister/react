import React, { Component } from 'react'
import './navbar.less'

export default class Navbar extends Component {
    render() {
        let logo = "Logisk"
        let logoBehind = '\'s Chat'
        let icon = (
            <div>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
            </div>
        )
        if(this.props.logo){
            logo = this.props.logo
        }
        if(this.props.logoBehind) {
            logoBehind = this.props.logoBehind
        }
        if(this.props.hidden){
            icon = (<div></div>)
        }
        return (
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-toggle">{icon}</div>
                    <div className="navbar-brand">
                        {this.props.children}
                        <span className="logo">{logo}</span>
                        <span className="logo-behind">{logoBehind}</span>
                    </div>
                </div>
            </nav>
        )
    }
}