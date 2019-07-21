import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Button, Input } from 'antd';
import { jsEncrypt } from '../../utils/index.js'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

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
    let { count } = this.props
    let {
      username,
      password,
      captcha,
      captchaSvg,
    } = this.state
    return (
      <div className="m-login">
        <div>
          登录{count}<button onClick={this.handleBtn.bind(this)}>按钮</button>
        </div>
        <div className="m-login-row">
          <Input placeholder="请输入用户名" value={username} onChange={this.handleInput.bind(this, 'username')}></Input>
        </div>
        <div className="m-login-row">
          <Input placeholder="请输入密码" type="password" value={password} onChange={this.handleInput.bind(this, 'password')}></Input>
        </div>
        <div className="m-login-row">
          <Input className="m-login-input-catpcha" placeholder="请输入验证码" value={captcha} onChange={this.handleInput.bind(this, 'captcha')}></Input>
          <span 
            className="m-captcha" 
            dangerouslySetInnerHTML={{__html: captchaSvg}}
            onClick={this.getCaptcha.bind(this)}
            >
          </span>          
        </div>
        <div className="m-login-row">
          <Button onClick={this.handleLogin.bind(this)}>登录</Button>
        </div>
        <div className="m-login-row">
          <Link to="/register" className="m-register">用户注册</Link>
        </div>
			</div>
    );
  }
}

Object.assign(Login.prototype, {
  componentDidMount() {
    this.getCaptcha()
  }
})

Object.assign(Login.prototype, {
  handleBtn() {
    let {count} = this.props
    count = count + 1
    this.props.TASK_CHANGAE_STATE(['count'], count)
  },
  handleLogin() {
    let {username, password, captcha} = this.state
    console.log(username,password)
    let data = {
      username,
      password: jsEncrypt(password),
      captcha
    }
    
    Api.login(data).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        console.log(res)
        this.props.history.push('/list')
      } else {
        this.getCaptcha()
      }
    }).catch((e) => {
      this.getCaptcha()
    })
  },
  getCaptcha() {
    Api.captcha().then((res) => {
      console.log(res)
      if (res.code === keyCode.SUCCESS) {
        localStorage.setItem('token', res.data.captchaId)
        this.setState({
          captchaSvg: res.data.captcha
        })
      }
    })
  }
})

//受控组件
Object.assign(Login.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

const mapStateToProps = (state) => {
  return {
    count: state.getIn(['task', 'count']) 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    TASK_CHANGAE_STATE: (key, value) => {
      dispatch({ type: 'TASK_CHANGAE_STATE', key, value });
    }    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
