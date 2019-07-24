import React from 'react';
import {Input, Button} from 'antd'
import Api from '../../api'
import {jsEncrypt} from '../../utils'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

let usernameDom, captchaDom
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      captcha: '',
      captchaSvg: '',
    }
  }
  render() {
    let {
      username,
      password,
      captcha,
      captchaSvg,
    } = this.state
    return (
      <div className="m-login">  
        <div className="m-login-title">
          后台管理系统
        </div>   
        <div className="m-login-row">
          <Input 
            type="text" 
            placeholder="请输入用户名"
            value={username} 
            ref={(input) => usernameDom = input}
            onChange={this.handleIput.bind(this, 'username')} ></Input>
        </div>
        <div className="m-login-row">
          <Input 
            type="password" 
            placeholder="请输入密码"
            value={password} 
            onChange={this.handleIput.bind(this, 'password')} ></Input>
        </div>    
        <div className="m-login-row">
          <Input 
            type="text" 
            placeholder="请输入验证码"
            value={captcha} 
            onKeyDown={this.handleEnter.bind(this)}
            ref={(input) => captchaDom = input}
            onChange={this.handleIput.bind(this, 'captcha')} ></Input>
          <span dangerouslySetInnerHTML={{__html: captchaSvg}} onClick={this.getCaptcha.bind(this)}></span>
        </div>   
        <div className="m-login-row">
          <Button onClick={this.handleLogin.bind(this)}>登录</Button>
        </div>           
			</div>
    );
  }
}

Object.assign(Login.prototype, {
  componentDidMount() {
    usernameDom.focus()
    this.getCaptcha()
  }
})

//事件
Object.assign(Login.prototype, {
  handleLogin() {
    let {
      username,
      password,
      captcha,
    } = this.state
    let data = {
      username,
      password: jsEncrypt(password),
      captcha,
    }
    Api.login(data).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        alert('登录成功！')
      }
    }).catch(() => {
      this.getCaptcha()
    })
    
  },
  getCaptcha() {
    Api.captcha().then((res) => {
      if (res.code === keyCode.SUCCESS) {
        this.setState({
          captchaSvg: res.data.captcha
        })
        localStorage.setItem('token', res.data.captchaId)
      }
    })
  },
  handleEnter(e) {
    if (e.keyCode === 13) {
      this.handleLogin()
      captchaDom.blur()
    }
  }
})

//受控组件
Object.assign(Login.prototype, {
  handleIput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default Login
