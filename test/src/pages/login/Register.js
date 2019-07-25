import React from 'react';
import {Input, Button, message} from 'antd'
import intl from 'react-intl-universal'
import {withRouter} from "react-router-dom"
import {emailCheck, jsEncrypt} from '../../utils'
import Api from '../../api'
import * as keyCode from '../../api/keyCode.js'
import './index.css'
import { from } from 'rxjs';

let usernameDom
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    }
  }
  render() {
    let {
      username,
      password,
      confirmPassword,
      email,
    } = this.state
    return (
      <div className="m-login">  
        <div className="m-login-row">
          <Input 
            type="text" 
            placeholder="请输入用户名"
            value={username} 
            ref={(input) => usernameDom = input}
            onChange={this.handleInput.bind(this, 'username')} ></Input>
        </div>
        <div className="m-login-row">
          <Input 
            type="password" 
            placeholder="请输入密码"
            value={password} 
            onChange={this.handleInput.bind(this, 'password')} ></Input>
        </div>       
        <div className="m-login-row">
          <Input 
            type="password" 
            placeholder="请确认密码"
            value={confirmPassword} 
            onChange={this.handleInput.bind(this, 'confirmPassword')} ></Input>
        </div>     
        <div className="m-login-row">
          <Input 
            type="text" 
            placeholder="请输入邮箱"
            value={email} 
            onChange={this.handleInput.bind(this, 'email')} ></Input>
        </div>              
        <div className="m-login-row">
          <Button onClick={this.handleRegister.bind(this)}>注册</Button>
        </div>           
			</div>
    );
  }
}

//生命周期
Object.assign(Register.prototype, {
  componentDidMount() {
    usernameDom.focus()
  }
})

//事件
Object.assign(Register.prototype, {
  handleRegister() {
    let {username, password, confirmPassword, email} = this.state
    if (!username.trim()) {
      message.info('用户名不能为空')
      return
    } else if (!password.trim()) {
      message.info('密码不能为空')
      return      
    } else if (password !== confirmPassword) {
      message.info('两次输入的密码不一致')
      return
    } else if (!(emailCheck(email) === true)) {
      message.info(emailCheck(email))
      return
    }
    let data = {
      username,
      password: jsEncrypt(password),
      email,
    }
    Api.register(data).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        this.props.history.push('/login')
      }
    })
  }
})

//受控组件
Object.assign(Register.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Register)
