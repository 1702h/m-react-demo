import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message } from 'antd';
import { jsEncrypt } from '../../utils/index.js'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      confirmPassword: '',
    }
  }
  render() {
    let {
      password,
      confirmPassword,
    } = this.state
    return (
      <div className="m-login">
        <div>
          重置密码
        </div>
        <div className="m-login-row">
          <Input placeholder="请输入密码" type="password" value={password} onChange={this.handleInput.bind(this, 'password')}></Input>
        </div>
        <div className="m-login-row">
          <Input placeholder="请再次输入密码" type="password" value={confirmPassword} onChange={this.handleInput.bind(this, 'confirmPassword')}></Input>
        </div>        
        <div className="m-login-row">
          <Button onClick={this.handleResetPassword.bind(this)}>重置密码</Button>
        </div>
			</div>
    );
  }
}

Object.assign(ResetPassword.prototype, {
  handleResetPassword() {
    let {password, confirmPassword} = this.state
    let temp = jsEncrypt(password)       
    console.log(temp)
    if (password != confirmPassword) {
      message.info('两次输入的密码不一样')
    }
    let {match} = this.props
    console.log(match)
    let data = {
      uid: match.params.token,
      password: jsEncrypt(password),
    };
    Api.resetPassword(data).then(res => {
      if (res.code === 200) {
        alert(res.message)
        this.props.history.push('/login')
      }        
    });
  }
})

//受控组件
Object.assign(ResetPassword.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(ResetPassword)
