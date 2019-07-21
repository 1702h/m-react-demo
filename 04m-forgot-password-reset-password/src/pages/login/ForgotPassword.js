import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message } from 'antd';
import { jsEncrypt } from '../../utils/index.js'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }
  render() {
    let {
      username
    } = this.state
    return (
      <div className="m-login">
        <div>
          找回密码
        </div>
        <div className="m-login-row">
          <Input placeholder="请输入用户名" value={username} onChange={this.handleInput.bind(this, 'username')}></Input>
        </div>
        <div className="m-login-row">
          <Button onClick={this.handleForgotPassword.bind(this)}>找回密码</Button>
        </div>
			</div>
    );
  }
}

Object.assign(ForgotPassword.prototype, {
  handleForgotPassword() {
    let {username} = this.state
    if ( username.trim() === '') {
      message.info('用户名不能为空')
    }
    Api.forgotPassword(`?username=${username}`).then((res) => {
      console.log(res)
      if (res.code === keyCode.SUCCESS) {
        message.info(res.message)
      }
    })
  }
})

//受控组件
Object.assign(ForgotPassword.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(ForgotPassword)
