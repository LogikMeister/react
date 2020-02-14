import React, { Component } from 'react'
import {Row, Col, Icon} from 'antd'
import {Switch, Route} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import io from 'socket.io-client'
import Navbar from '@/components/navbar/navbar.jsx'
import './chat.less'



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
        //     return <Redirect to="/login" />
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
                        <Route path="" ></Route>
                        <Route path="" ></Route>
                        <Route path="" ></Route>
                    </Switch>
                </div>
                <Row className="footer">
                    <Col span={8} className="item">
                        <Icon type="message" className="icon"/>
                        <p className="title">聊</p>
                    </Col>
                    <Col span={8} className="item">
                        <Icon type="team" className="icon"/>
                        <p className="title">朋友圈</p>
                    </Col>
                    <Col span={8} className="item">
                        <Icon type="user" className="icon"/>
                        <p className="title">我</p>
                    </Col>
                </Row>
            </div>
        )
    }
}
