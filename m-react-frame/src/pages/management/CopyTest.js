import React from 'react';
import { withRouter } from 'react-router-dom'
import * as clipboard from "clipboard-polyfill"
import { Button, Input, message } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import './index.css'

const { TextArea } = Input;

const data = {
  "param.code.name": "姓名",
  "param.code.nickname": "昵称",
}
class CopyTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMessage: '姓名：，昵称：',
    }
  }
  render() {
    let {
      currentMessage
    } = this.state
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <Button onClick={this.handleCopy.bind(this, 'param.code.name')}>姓名</Button>
            <Button onClick={this.handleCopy.bind(this, 'param.code.nickname')}>昵称</Button>
            <TextArea
              rows={10}
              value={currentMessage}
              onPaste={this.handlePaste.bind(this)}
              onChange={this.handleInput.bind(this, 'currentMessage')}></TextArea>
            <Button onClick={this.handleControl.bind(this, 'add')}>添加</Button>
            <Button onClick={this.handleControl.bind(this, 'delete')}>删除</Button>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

Object.assign(CopyTest.prototype, {
  handleCopy(field) {
    let temp = `[${data[field]}(${field})]`
    console.log(temp)
    clipboard.writeText(temp)
  },
  handleControl(field) {
    let {
      currentMessage,
    } = this.state
    if (field === 'add' && currentMessage.indexOf('[') < 0) {
      currentMessage = currentMessage.replace(/\((.+?)\)/g, function (word) {
        let key = word.slice(1, word.length - 1)
        return `[${data[key]}${word}]`
      });
      this.setState({
        currentMessage
      })
    } else if (field === 'delete') {
      let temp = currentMessage.replace(/\[.*?\(/g, '(').replace(/]/g, '')
      this.setState({
        currentMessage: temp
      })
    }
  },
  handlePaste() {
  }
})

//受控组件
Object.assign(CopyTest.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(CopyTest)
