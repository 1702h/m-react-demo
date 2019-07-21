import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message } from 'antd';
import { jsEncrypt } from '../../utils/index.js'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
    }
  }
  render() {
    let { count } = this.props
    let {
      username,
      password,
      email,
    } = this.state
    return (
      <div className="m-login">
        <div>
          注册
        </div>
        <div className="m-login-row">
          <Input placeholder="请输入用户名" value={username} onChange={this.handleInput.bind(this, 'username')}></Input>
        </div>
        <div className="m-login-row">
          <Input placeholder="请输入密码" type="password" value={password} onChange={this.handleInput.bind(this, 'password')}></Input>
        </div>
        <div className="m-login-row">
          <Input placeholder="请输入邮箱" type="email" value={email} onChange={this.handleInput.bind(this, 'email')}></Input>
        </div>
        <div className="m-login-row">
          <Button onClick={this.handleRegister.bind(this)}>注册</Button>
        </div>
			</div>
    );
  }
}

Object.assign(Register.prototype, {
  handleRegister() {
    let {username, password, email} = this.state
    console.log(username,password)
    let data = {
      username,
      password: jsEncrypt(password),
      email
    }
    
    Api.register(data).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        console.log(res)
        message.info(res.message)
      }
    }).catch((e) => {
    })
  },
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
