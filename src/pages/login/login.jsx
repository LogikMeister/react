import React, { Component } from 'react'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd'
import './login.less'
import {reqLogin, reqRegister} from '@/api/auth.js'
import memoryUtils from '@/utils/memoryUtils.js'
import storageUtils from '@/utils/storageUtils'

class LoginForm extends Component {
    handleSubmit = e =>{
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                const response = await reqLogin(values.username, values.password, values.remember)
                const results = response.data
                if(results.success){
                    memoryUtils.current_user = results.user
                    // storageUtils.saveUser(results.user)
                    this.props.loginSuccessJump()
                } else{
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
