import React, { Component } from 'react'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd'
import {Redirect} from 'react-router-dom'
import './login.less'
import {reqLogin, reqRegister} from '@/api/auth.js'


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
                } else{
                    message.error('用户名或密码错误')
                }
            } 
        })
    }

    render() {
        if(localStorage.getItem('token')) {
            return <Redirect to="/" />
        }
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
                    <div className="right">没有注册？ <a href="">点击注册</a></div>
                </Form.Item>
            </Form>
        )
    }
}

const WrapLoginForm = Form.create()(LoginForm)

export default  class Login extends Component {
    changeHistory = () =>{
        console.log('我要改变地址了')
        this.props.history.replace('/')
    }
    
    render() {
        return (
            <div className="auth">
                <div className="login">
                    <div className="title">
                        登陆
                    </div>
                    <WrapLoginForm loginSuccessJump={this.changeHistory}/>
                </div>
            </div>
        )
    }
}
