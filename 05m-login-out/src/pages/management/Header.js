import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message } from 'antd';
import { jsEncrypt } from '../../utils/index.js'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }
  render() {
    let {
      username
    } = this.state
    return (
      <div className="m-management-header">
        <div className="m-header-title">
          后台管理系统
        </div>
        <div className="m-header-right">
          <span>用户名：</span>
          <span className="m-header-username">{username}</span>
          <Button onClick={this.handleLoginOut.bind(this)}>退出</Button>
        </div>
			</div>
    );
  }
}

Object.assign(Header.prototype, {
  componentDidMount() {
    this.setState({
      username: localStorage.getItem('username')
    })
  }
})

Object.assign(Header.prototype, {
  handleLoginOut() {
    Api.loginOut().then((res) => {
      if (res.code === keyCode.SUCCESS) {
        localStorage.removeItem('token')
        console.log(res)
        this.props.history.push('/login')
      }
    }).catch((e) => {
    })
  },
})

//受控组件
Object.assign(Header.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Header)
