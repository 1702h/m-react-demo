import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message } from 'antd';
import { jsEncrypt } from '../../utils/index.js'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

class Article extends React.Component {
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
      <div className="m-content">
        <div>
        文章
        </div>
        <div className="m-login-row">
          <Button onClick={this.handleRegister.bind(this)}>文章</Button>
        </div>
			</div>
    );
  }
}

Object.assign(Article.prototype, {
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
Object.assign(Article.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Article)
