import React, { Component } from 'react'
import {Row, Col, Icon, Avatar, Button, Input} from 'antd'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import io from 'socket.io-client'
import Navbar from '@/components/navbar/navbar.jsx'
import './chat.less'
import avatar from './avatar.jpg'

const { TextArea } = Input

export default class Chat extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         socket: io(location.protocol + '//' + document.domain + ':' + location.port + '/socket', {autoConnect: false})
    //     }
    // }

    // componentDidMount() {
    //     const {socket} = this.state
    //     socket.on('connect', (res) => {
    //         console.log(res)
    //         console.log('connect success')
    //     })
    //     socket.on('response',(data) => {
    //         if (data.code == '200'){
    //             alert(data.msg);
    //         }else{
    //             alert('ERROR:' + data.msg);
    //         }
    //     })
    //     socket.on('disconnect', (res) => {
    //         console.log(res)
    //         console.log('disconnect success')
    //     })
    // }

    // clickEnter = () => {
    //     const {socket} = this.state
    //     socket.connect()
    // }

    // clickSend = () => {
    //     const {socket} = this.state
    //     socket.emit('request_for_response', 'str')
    // }

    // clickQuit = () => {
    //     const {socket} = this.state
    //     socket.disconnect()
    // }

    render() {
        // if(!localStorage.getItem('token')) {
        //     return <Redirect to="/" />
        // }
        return (
            // <div>
            //     <div onClick={this.clickEnter}>connect</div>
            //     <div onClick={this.clickSend}>send message</div>
            //     <div onClick={this.clickQuit}>disconnect</div>
            // </div>
            <div style={{height: '100%', width: '100%'}}>
                <Navbar/>
                <div className="content">
                    <Switch>
                        <Route exact path="/app/chatto" component={ChatTo}></Route>
                        <Route path="/app/chatto/:username" component={ChatFrame}></Route>
                        <Route path="/app/me" component={Me}></Route>
                        <Redirect to="/app/chatto"></Redirect>
                    </Switch>
                </div>
                <Row className="footer">
                    <Link to="/app/chatto">
                        <Col span={8} className="item">
                            <Icon type="message" className="icon"/>
                            <p>聊</p>
                        </Col>
                    </Link>
                    <Link to="/app/circle">
                        <Col span={8} className="item">
                            <Icon type="team" className="icon"/>
                            <p>朋友圈</p>
                        </Col>
                    </Link>
                    <Link to="/app/me">
                        <Col span={8} className="item">
                            <Icon type="user" className="icon"/>
                            <p>我</p>
                        </Col>
                    </Link>
                </Row>
            </div>
        )
    }
}

class Me extends Component {
    render(){
        return(
            <div>
                <div className="user">
                    <Avatar size={81} icon="user" className="avatar" src={avatar}/>
                    <div className="user-inf">
                        <div style={{float: 'left'}}>
                            <p className="name">LogikMeister</p>
                            <p className="signature">阵痛过后是新生</p>
                        </div>
                        <Icon type="edit" className="edit"/>
                    </div>
                </div>
                <div className="line"></div>
                <Button type="danger" size="large" block style={{marginTop: '10px'}}>退出登陆</Button>
            </div>
        )
    }
}

class ChatTo extends Component {
    render() {
        return (
            <div>
                <Link to="/app/chatto/好友1">
                    <Row  type="flex" justify="start" align="middle" className="message-box">
                        <Col span={4}  className="avatar"><Avatar shape="square" size={48} icon="user"/></Col>
                        <Col span={20} className="message">
                            <p className="name">好友1</p>
                            <p className="message-last">[最近消息]：很遗憾以这种方式认识你4455553333455555555555555</p>
                        </Col>
                    </Row>
                </Link>
            </div>
        )
    }
}

class ChatFrame extends Component {
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

    render() {
        return (
            <div>
                <TextArea placeholder="Autosize height based on content lines" autoSize onChange={this.messageChange}/>
            </div>
        )
    }
}