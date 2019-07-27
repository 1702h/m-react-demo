import React from 'react';
import {Input, Button, Select} from 'antd'
import intl from 'react-intl-universal'
import {Link, withRouter} from "react-router-dom"
import Api from '../../api'
import {jsEncrypt} from '../../utils'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

let usernameDom, captchaDom
const {Option} = Select
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      captcha: '',
      captchaSvg: '',
      language: '',
    }
  }
  render() {
    let {
      username,
      password,
      captcha,
      captchaSvg,
      language,
    } = this.state
    console.log(intl.get('login.loginTitle'))
    return (
      <div className="m-login">  
        <div className="m-language-warp">
          <Select value={language} onChange={this.handleSelect.bind(this, 'language')}>
            <Option value="zh-CN">简体中文</Option>
            <Option value="en-US">English</Option>
          </Select>          
        </div>
        <div className="m-login-title">
          {intl.get('login.loginTitle')}
        </div>   
        <div className="m-login-row">
          <Input 
            type="text" 
            placeholder={intl.get('login.usernamePlaceholder')}
            value={username} 
            ref={(input) => usernameDom = input}
            onChange={this.handleInput.bind(this, 'username')} ></Input>
        </div>
        <div className="m-login-row">
          <Input 
            type="password" 
            placeholder={intl.get('login.passwordPlaceholder')}
            value={password} 
            onChange={this.handleInput.bind(this, 'password')} ></Input>
        </div>    
        <div className="m-login-row">
          <Input 
            type="text" 
            placeholder={intl.get('login.catpchaPlaceholder')}
            value={captcha} 
            onKeyDown={this.handleEnter.bind(this)}
            ref={(input) => captchaDom = input}
            onChange={this.handleInput.bind(this, 'captcha')} ></Input>
          <span dangerouslySetInnerHTML={{__html: captchaSvg}} onClick={this.getCaptcha.bind(this)}></span>
        </div>   
        <div className="m-login-row">
          <Button onClick={this.handleLogin.bind(this)}>{intl.get('login.login')}</Button>
        </div>     
        <div className="m-login-row">
          <Link to="/register">注册</Link>
        </div>      
			</div>
    );
  }
}

//生命周期
Object.assign(Login.prototype, {
  componentDidMount() {
    usernameDom.focus()
    this.getCaptcha()
    this.initLanguage()
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
        localStorage.setItem('token', res.data.token)
        this.props.history.push('/management/file_upload')
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
  },
  initLanguage() {
    let currentLocale = localStorage.getItem('language') || 'zh-CN'
    const locales = {
      "en-US": require('../../i18n/en-US.js').default,
      "zh-CN": require('../../i18n/zh-CN.js').default,
    };    
    intl.init({
      currentLocale,
      locales
    }).then(() => {

    })
    this.setState({
      language: currentLocale
    })
  }
})

//受控组件
Object.assign(Login.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  },
  handleSelect(field, value) {
    localStorage.setItem('language', value)
    this.setState({
      [field]: value
    })
    //window.location.reload()
    this.initLanguage()
  }
})

export default withRouter(Login)
