import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Button, Input, Select } from 'antd';
import { jsEncrypt } from '../../utils/index.js'
import intl from 'react-intl-universal'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

const { Option } = Select
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      captcha: '',
      captchaSvg: '',
      language: 'zh-CN'
    }
  }
  render() {
    let { count } = this.props
    let {
      username,
      password,
      captcha,
      captchaSvg,
      language,
    } = this.state
    return (
      <div className="m-login">
        <div className="m-language">
          <Select value={language} onChange={this.handleLanguage.bind(this)}>
            <Option value="zh-CN">简体中文</Option>
            <Option value="en-US">Englist</Option>
            <Option value="zh-TW">繁體中文</Option>
          </Select>
        </div>
        <div className="m-login-title">
          {intl.get('login.loginTitle')}
        </div>
        <div className="m-login-row">
          <Input 
            placeholder={intl.get('login.usernamePlaceholder')} 
            value={username} 
            ref={(input) => this.userNameInput = input}
            onChange={this.handleInput.bind(this, 'username')}></Input>
        </div>
        <div className="m-login-row">
          <Input placeholder={intl.get('login.passwordPlaceholder')} type="password" value={password} onChange={this.handleInput.bind(this, 'password')}></Input>
        </div>
        <div className="m-login-row">
          <Input 
            className="m-login-input-catpcha" 
            placeholder={intl.get('login.catpchaPlaceholder')} 
            value={captcha}
            ref={(input) => this.captchaInput = input}
            onKeyDown={this.handleEnter.bind(this)} 
            onChange={this.handleInput.bind(this, 'captcha')}></Input>
          <span 
            className="m-captcha" 
            dangerouslySetInnerHTML={{__html: captchaSvg}}
            onClick={this.getCaptcha.bind(this)}
            >
          </span>          
        </div>
        <div className="m-login-row">
          <Button onClick={this.handleLogin.bind(this)}>{intl.get('login.login')}</Button>
        </div>
        <div className="m-login-row">
          <Link to="/register" className="m-link">{intl.get('login.userRegister')}</Link>
          <Link to="/forgot_password" className="m-link">{intl.get('login.forgotPassword')}</Link>
        </div>
        <div>
          {intl.get('login.login')}{count}<button onClick={this.handleBtn.bind(this)}>按钮</button>
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
  },
  languageInit() {
    let currentLocale = localStorage.getItem('language') || 'zh-CN'
    intl.init({
      currentLocale: currentLocale,    
      locales: {
        [currentLocale]: require(`../../i18n/${currentLocale}`).default
      }
    }).then(() => {
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
  }
})

//事件
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
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        //this.props.history.push('/list')
        this.props.history.push('/management/file_upload')
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
  },
  handleLanguage(language) {
    this.setState({
      language
    })
    localStorage.setItem('language', language);
    let currentLocale = language
    //window.location.reload()    
    intl.init({
      currentLocale: currentLocale,    
      locales: {
        [currentLocale]: require(`../../i18n/${currentLocale}`).default
      }
    }).then(() => {
    })     
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
