import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import './index.css'

const { TextArea } = Input;
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.data = {
      "param.code.name": "姓名",
      "param.code.nickname": "昵称",
    }
    this.state = {
    }
  }
  render() {

    return (
      <div className="m-management-title">     
        后台管理系统
			</div>
    );
  }
}

Object.assign(Header.prototype, {

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
