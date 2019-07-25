import React from 'react';
import { withRouter } from 'react-router-dom'
import * as clipboard from "clipboard-polyfill"
import { Button, Input, message } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import './index.css'

const { TextArea } = Input;
class Copy extends React.Component {
  constructor(props) {
    super(props)
    this.data = {
      "param.code.name": "姓名",
      "param.code.nickname": "昵称",
    }
    this.state = {
      historyMessage: `大家好，我是，也可以以叫我`,
      currentMessage: `大家好，我是，也可以以叫我`
    }
  }
  render() {
    let {
      currentMessage,
    } = this.state
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <div>
              <Button onClick={this.handleCopy.bind(this, "param.code.name")}>姓名</Button>
              <Button onClick={this.handleCopy.bind(this, "param.code.nickname")}>昵称</Button>
            </div>
            <TextArea 
              rows={10}
              value={currentMessage} 
              onPaste={this.handlePaste.bind(this)}
              onChange={this.handleInput.bind(this, 'currentMessage')}></TextArea>
            <div>
              <Button onClick={this.handleDeleteValue.bind(this)}>去除[value]</Button>
              <Button onClick={this.handleAddValue.bind(this)}>补充[value]</Button>
            </div>
          </div>                   
        </Scrollbars>        
			</div>
    );
  }
}

Object.assign(Copy.prototype, {
  handleCopy(field) {
    let temp = `[${this.data[field]}(${field})]`
    clipboard.writeText(temp);
    message.info('复制成功')
  },
  handleDeleteValue() {
    let {currentMessage} = this.state
    this.setState({
      historyMessage: currentMessage
    })
    let temp = currentMessage.replace(/\[.*?\(/g, '(').replace(/]/g, '')
    this.setState({
      currentMessage: temp
    })
  },  
  handleAddValue() {
    let {historyMessage} = this.state
    this.setState({
      currentMessage: historyMessage
    })    
  },   
  handlePaste(e) {
    console.log(e.clipboardData.getData('text'))
    console.log(e.target.value)
  } 
})

//受控组件
Object.assign(Copy.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Copy)
