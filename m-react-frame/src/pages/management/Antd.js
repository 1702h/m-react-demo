import React from 'react';
import { withRouter } from 'react-router-dom'
import * as clipboard from "clipboard-polyfill"
import { Button, Input, message, Modal } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import './index.css'

class Antd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      list: [],
      visible: false,
      currentIndex: 0,
    }
  }
  render() {
    let {
      text,
      visible,
    } = this.state
    let listArrDom = this.renderList()
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <Input value={text} onChange={this.handleInput.bind(this, 'text')}></Input>
            <Button onClick={this.handleAdd.bind(this)}>添加</Button>
          </div>
          <ul>
            {listArrDom}
          </ul>
          <Modal
            title="添加"
            visible={visible}
            onOk={this.handleChecked.bind(this)}
            onCancel={this.handleHideModal.bind(this)}>
              <div>标记为已完成</div>           
          </Modal>  
        </Scrollbars>
      </div>
    );
  }
}

Object.assign(Antd.prototype, {
  renderList() {
    let {list} = this.state
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(
        <li key={i} onClick={this.handleShowModal.bind(this, i)}>{list[i].value}---{list[i].checked ? '√': ''}</li>
      )
    }
    return arr
  }
})

Object.assign(Antd.prototype, {
  handleAdd() {
    let {text, list} = this.state
    list.push({
      value: text,
      checked: false
    })
    console.log(list)
    this.setState({
      list,
      text: ''
    })
  },
  handleChecked() {
    let {list, currentIndex} = this.state
    list[currentIndex].checked = true
    this.setState({
      list
    })
    this.handleHideModal()
  },
  handleShowModal(index) {
    this.setState({
      visible: true,
      currentIndex: index,
    })
  },
  handleHideModal() {
    this.setState({
      visible: false
    })    
  }
})

//受控组件
Object.assign(Antd.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Antd)
