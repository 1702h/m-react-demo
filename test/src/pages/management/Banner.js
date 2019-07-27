import React from 'react';
import { withRouter } from 'react-router-dom'
import * as clipboard from "clipboard-polyfill"
import { Button, Input, message, Modal, Table } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import Api from '../../api'
import * as keyCode from '../../api/keyCode.js'
import './index.css'
import { list } from 'postcss';
class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.data = {
      "param.code.name": "姓名",
      "param.code.nickname": "昵称",
    }
    this.state = {
      visible: false,
      path: '',
      remarks: '',
      list: [],
    }
  }
  render() {
    let {
      visible,
      path,
      remarks,
      list,
    } = this.state
    let columns = [
      {
        title: '图片',
        dataIndex: 'path',
        key: 'path',
        render: (text, record, index) => {
          return <span><img src={text} className="m-upload-img"></img></span>
        }        
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
      },
      {
        title: '操作',
        render: (text, record, index) => {
          return <div>
            <Button onClick={this.handleDelete.bind(this, record)} >删除</Button>
          </div>
        }
      }, 
    ]
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <div>
              <Button onClick={this.handleShowModal.bind(this)}>添加</Button>
            </div>
            <Table
              columns={columns}
              dataSource={list}
              rowKey='uid'
            ></Table>

            <Modal
              title="添加"
              visible={visible}
              onOk={this.handleAdd.bind(this)}
              onCancel={this.handleHideModal.bind(this)}
            >
              <div className="m-row">
                <Input 
                  type="text" 
                  value={path}
                  placeholder="请输入图片地址"
                  onChange={this.handleInput.bind(this, 'path')}></Input>
              </div>
              <div className="m-row">
                <Input 
                  type="text" 
                  value={remarks}
                  placeholder="请输入备注信息"
                  onChange={this.handleInput.bind(this, 'remarks')}></Input>
              </div>              
            </Modal>
          </div>                   
        </Scrollbars>        
			</div>
    );
  }
}

//生命周期
Object.assign(Banner.prototype, {
  componentDidMount() {
    this.getList()
  }
})

//事件
Object.assign(Banner.prototype, {
  handleShowModal() {
    this.setState({
      visible: true
    })
  },
  handleHideModal() {
    this.setState({
      visible: false
    })
  },
  handleAdd() {
    let {
      path,
      remarks,
    } = this.state
    let data = {
      path,
      remarks,
    }
    Api.addBanner(data).then((res) => {
      this.handleHideModal()
      this.getList()
    })
  },
  getList() {
    Api.getBannerList().then((res) => {
      if (res.code === keyCode.SUCCESS) {
        this.setState({
          list: res.data.list
        })
      }
    })
  },
  handleDelete(record) {
    let data = {
      uid: record.uid
    }
    Api.deleteBanner(data).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        this.getList()
      }      
    })
  }
})

//受控组件
Object.assign(Banner.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Banner)
