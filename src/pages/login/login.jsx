import React, { Component } from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import './login.less'
import {reqLogin, reqRegister} from '@/api/auth.js'

class LoginForm extends Component {
    handleSubmit = e =>{
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                console.log('发送post请求', values)
                const response = await reqLogin(values.username, values.password, values.remember)
                //response相关处理
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
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Checkbox>记住密码</Checkbox>)}
                    <a className="right" href="">
                        忘记密码
                    </a>
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
    render() {
        return (
            <div className="auth">
                <div className="login">
                    <div className="title">
                        登陆
                    </div>
                    <WrapLoginForm/>
                </div>
            </div>
        )
    }
}
