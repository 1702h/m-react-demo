import React from 'react';
import { connect } from 'react-redux'
import {Input, Button, Select} from 'antd'
import intl from 'react-intl-universal'
import {jsEncrypt} from '../../utils/index.js'
import actions from '../../store/task/actionTypes'
import Api from '../../api';
import * as keyCode from '../../api/keyCode.js'
import { from } from 'rxjs';

const {Option} = Select
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      captcha: '',
      captchaSvg: '',
      language: 'zh-CN',
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
    return (
      <div className="m-login">
        <div>
          <div>
            <Select value={language} onChange={this.handleSelect.bind(this)}>
              <Option value="zh-CN">中文</Option>
              <Option value="en-US">English</Option>
            </Select>
          </div>
          <div>{intl.get('login.loginTitle')}</div>
          <div className="m-login-row">
            <Input 
              placeholder={intl.get('login.usernamePlaceholder')} 
              value={username} 
              ref={(input) => this.userNameInput = input}
              onChange={this.handleInput.bind(this, 'username')}></Input>
          </div>
          <div>
            <Input 
              type="password" 
              placeholder="请输入密码" 
              value={password} 
              autoComplete="off"
              onChange={this.handleInput.bind(this, 'password')}></Input>
          </div>   
          <div>
            <Input 
              type="text" 
              placeholder="请输入验证码" 
              value={captcha} 
              autoComplete="off"
              ref={(input) => this.captchaInput = input}
              onKeyDown={this.handleEnter.bind(this)}               
              onChange={this.handleInput.bind(this, 'captcha')}></Input>
              <span dangerouslySetInnerHTML={{__html: captchaSvg}} onClick={this.getCaptcha.bind(this)}>
              </span>
          </div>                   
          <div>
            <Button onClick={this.handleLogin.bind(this)}>{intl.get('login.login')}</Button>
          </div>
        </div>        
			</div>
    );
  }
}

//生命周期
Object.assign(Login.prototype, {
  componentDidMount() {
    this.userNameInput.focus()
    this.getCaptcha()
    this.languageInit()
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
      console.log(res)
    }).catch(() => {
      this.getCaptcha()
    })

    console.log(username, password, captcha)
  },
  getCaptcha() {
    Api.captcha().then((res) => {
      if (res.code === keyCode.SUCCESS) {
        localStorage.setItem('token', res.data.captchaId)
        this.setState({
          captchaSvg: res.data.captcha
        })
      }
      console.log(res)
    })
  },
  languageInit() {
    let currentLocale = localStorage.getItem('language') || 'zh-CN'
    intl.init({
      currentLocale: currentLocale,
      locales: {
        [currentLocale]: require(`../../i18n/${currentLocale}`).default
      }
    })
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'zh-CN')
      this.setState({
        language: 'zh-CN'
      })
    } else {
      this.setState({
        language: currentLocale
      })
    }
  },
  handleEnter(e) {
		if (e.keyCode === 13) {
			this.handleLogin()
			this.captchaInput.blur()
		}    
  }  
})

//受控组件
Object.assign(Login.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  },
  handleSelect(value) {
    this.setState({
      language: value
    })
    localStorage.setItem('language', value)
    window.location.reload()
  }
})

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    TASK_CHANGAE_STATE: (key, value) => {
      dispatch({ type: actions.TASK_CHANGAE_STATE, key, value });
    }    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
