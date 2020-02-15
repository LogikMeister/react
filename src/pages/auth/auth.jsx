import React, { Component } from 'react'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd'
import {Redirect} from 'react-router-dom'
import './auth.less'
import {reqLogin, reqRegister} from '@/api/auth.js'
import Navbar from '@/components/navbar/navbar.jsx'

class LoginForm extends Component {
    handleSubmit = e =>{
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                const response = await reqLogin(values.username, values.password)
                if(response.data.success){
                    localStorage.setItem('refreshToken',response.data.data.refreshToken)
                    localStorage.setItem('token',response.data.data.token)
                    this.props.loginSuccessJump()
                } else {
                    message.error('用户名或密码错误')
                }
            } 
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '用户名不能为空'}]
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '密码不能为空'}]
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="login-form-button">
                        登陆
                    </Button>
                    <div className="right">没有注册？ <span className="span" onClick={this.props.toRegister}>点击注册</span></div>
                </Form.Item>
            </Form>
        )
    }
}

class RegisterForm extends Component {
    validateEmail = (rule, value, callback) => {
        if(!value) {
            callback('内容不能为空')
        } else if (!/^[a-zA-Z0-9]+[a-zA-Z0-9_-]*[@][a-zA-Z0-9]+(\.[a-zA-Z]+)+$/.test(value)) {
            callback('请输入正确格式的邮箱')
        } else {
            callback()
        }
    }

    validateUsername = (rule, value, callback) => {
        if(!value) {
            callback('内容不能为空')
        } else if (!/^[a-zA-Z]+[a-zA-Z0-9_]*$/.test(value)) {
            callback('用户名首位必须为字母,由字母、数字、下划线构成')
        } else if (value<6){
            callback('用户名长度至少为6位')
        } else {
            callback()
        }
    }

    validatePassword = (rule, value, callback) => {
        if(!value) {
            callback('内容不能为空')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码由0-9,a-z,A-Z,_构成')
        } else if (value<6){
            callback('密码长度至少为6位')
        } else {
            callback()
        }
    }

    validatePasswordConfirm = (rule, value, callback) => {
        const elem = document.getElementById('password')
        if(value !== elem.value) {
            callback('前后密码不一致')
        } else {
            callback()
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields(async (err, value) => {
            if(!err) {
                const response = await reqRegister(value.email, value.username, value.password)
                if(response.data.success) {
                    message.success('注册成功')
                    this.props.toLogin()
                } else {
                    const error = [null, '邮箱已经被注册了', '用户名已经被注册了', '邮箱和用户名都被注册了']
                    message.error(error[response.data.data['error']])
                }
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{validator: this.validateEmail}],
                        validateTrigger	: 'onSubmit'
                    })(
                        <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入注册邮箱"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{validator: this.validateUsername}]
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入注册用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{validator: this.validatePassword}]
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password2', {
                        rules: [{validator: this.validatePasswordConfirm}]
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="请再次输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="login-form-button">
                        注册
                    </Button>
                    <div className="right">已经注册？ <span className="span" onClick = {this.props.toLogin}>点击登陆</span></div>
                </Form.Item>
            </Form>
        )
    }
}

const WrapLoginForm = Form.create()(LoginForm)
const WrapRegisterForm = Form.create()(RegisterForm)

export default  class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {status: true}
    }

    changeHistory = () => {
        message.success('登陆成功')
        this.props.history.replace('/')
    }

    toRegister = () => {
        this.setState({status: false})
    }

    toLogin = () => {
        this.setState({status: true})
    }
    
    render() {
        if(localStorage.getItem('token')) {
            return <Redirect to="/app" />
        }
        const {status} = this.state
        let form, title
        if(status){
            title = "登陆"
            form = (<WrapLoginForm loginSuccessJump={this.changeHistory} toRegister={this.toRegister}/>)
        } else {
            title = "注册"
            form = (<WrapRegisterForm toLogin={this.toLogin}/>)
        }
        return (
            <div className="main">
                <Navbar/>
                <div className="auth">
                    <div className="authform">
                        <div className="title">
                            {title}
                        </div>
                        {form}
                    </div>
                </div>
            </div>
        )
    }
}
