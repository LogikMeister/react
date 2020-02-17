import React, { Component } from 'react'
import {Row, Col, Avatar, Button, Input, Icon} from 'antd'
import io from 'socket.io-client'
import './chatFarme.less'
import Navbar from '@/components/navbar/navbar.jsx'
const {TextArea} = Input

export default class ChatFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }
    messageChange = e => {
        this.setState({
            message: e.target.value
        })
    }
    goBack = () =>{
        this.props.history.goBack()
    }
    onPressEnter = () => {
        console.log(this.state.message)
    }
    render() {
        let logo
        if(this.props.group) {
            logo = "Chat in"
        } else {
            logo = "Chat with"
        }
        const {room} = this.props.match.params
        return (
            <div>
                <Navbar logo={logo} logoBehind={room} hidden><Icon type="left" onClick={this.goBack}/> </Navbar>
                <div className="content">
                    <MyMessage name="好友1" message="你好呀很遗憾以这种方式认识你你好呀很遗憾以这种方式认识你你好呀很遗憾以这种方式认识你你好呀很遗憾以这种方式认识你你好呀很遗憾以这种方式认识你" left />
                    <MyMessage name="好友1" message="你好呀很遗憾以这种方式认识你" right />
                    <MyMessage message="你好呀很遗憾以这种方式认识你" left />
                    <MyMessage message="你好呀很遗憾以这种方式认识你" right />
                </div>
                <div className="send-msg-box">
                    <Row type="flex" align="middle">
                        <Col span={18}>
                            <TextArea autoSize onChange={this.messageChange} />
                        </Col>
                        <Col span={6}>
                            <div style={{textAlign: 'center'}}>
                                <Button type="primary" shape="round" onClick={this.onPressEnter} >发送</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

class MyMessage extends Component {
    render() {
        let myMessage
        if(this.props.left) {
            myMessage = (
            <Row className="my-message clearfix">
                <Col span={3} className="avatar-left">
                    <Avatar shape="square" size="large" icon="user" />
                </Col>
                <Col span={18} className="name-and-bubble-left">
                    <div className="name">{this.props.name}</div>
                    <div className="bubble">{this.props.message}</div>
                </Col>
            </Row>
            )
        }
        if(this.props.right) {
            myMessage = (
                <Row className="my-message clearfix">
                    <Col span={3} className="avatar-right">
                        <Avatar shape="square" size="large" icon="user" />
                    </Col>
                    <Col span={18} className="name-and-bubble-right">
                        <div className="name">{this.props.name}</div>
                        <div className="bubble">{this.props.message}</div>
                    </Col>
                </Row>
            )
        }
        return myMessage
    }
}